import { marked } from "marked";
import { config } from './config'
import { setColor } from './theme'
import hljs from "highlight.js";
import { isGithubHost } from "../utils/utils";

class WxRenderer {
    getRenderer: Function
    styleMapping: Map<any, any>
    constructor(opt: any) {
        console.log('create new instance...')
        const buildTheme = (themeTpl: any) => {
            let mapping = {} as any;
            let merge = (base: any, extend: any) => Object.assign({}, base, extend);

            let base = merge(themeTpl.BASE, {
                "font-family": config.builtinFonts[0].value,
                "font-size": config.sizeOption[3].value,
            });
            for (let ele in themeTpl.inline) {
                if (themeTpl.inline.hasOwnProperty(ele)) {
                    let style = themeTpl.inline[ele];
                    mapping[ele] = merge(themeTpl.BASE, style);
                }
            }

            let base_block = merge(base, {});
            for (let ele in themeTpl.block) {
                if (themeTpl.block.hasOwnProperty(ele)) {
                    let style = themeTpl.block[ele];
                    mapping[ele] = merge(base_block, style);
                }
            }
            return mapping;
        };

        this.styleMapping = buildTheme(opt.theme);
        let footnotes = [];
        let footnoteIndex = 0;
        let addFootnote = (title: string, link: string) => {
            footnotes.push([++footnoteIndex, title, link]);
            return footnoteIndex;
        };

        const getStyles = (tokenName: any, addition: any = '') => {
            let arr = [];
            // @ts-ignore
            let dict = this.styleMapping[tokenName];
            // console.log(`tok:${tokenName}, dic:${dict}`)
            if (!dict) return "";
            for (const key in dict) {
                arr.push(key + ":" + dict[key]);
            }
            return `style="${arr.join(";") + (addition || "")}"`;
        };

        const renderer = {
            heading(text: any, level: any) {
                switch (level) {
                    case 1:
                        return `<h1 ${getStyles("h1")}>${text}</h1>`;
                    case 2:
                        return `<h2 ${getStyles("h2")}>${text}</h2>`;
                    case 3:
                        return `<h3 ${getStyles("h3")}>${text}</h3>`;
                    default:
                        return `<h4 ${getStyles("h4")}>${text}</h4>`;
                }
            },
            paragraph(text: string) {
                if (text.indexOf("<figure") != -1 && text.indexOf("<img") != -1) {
                    return text;
                }
                return text.replace(/ /g, "") === ""
                    ? ""
                    : `<p ${getStyles("p")}>${text}</p>`;
            },
            blockquote(text: any) {
                text = text.replace(/<p.*?>/g, `<p ${getStyles("blockquote_p")}>`);
                return `<blockquote ${getStyles("blockquote")}>${text}</blockquote>`;
            },
            code(text: any, lang = "") {
                if (lang.startsWith("mermaid")) {
                    setTimeout(() => {
                        window.mermaid?.run();
                    }, 0);
                    return `<center><pre class="mermaid">${text}</pre></center>`;
                }
                lang = lang.split(" ")[0];
                lang = hljs.getLanguage(lang) ? lang : "plaintext";
                text = hljs.highlight(text, { language: lang }).value;
                text = text
                    .replace(/\r\n/g, "<br/>")
                    .replace(/\n/g, "<br/>")
                    .replace(/(>[^<]+)|(^[^<]+)/g, function (str: string) {
                        return str.replace(/\s/g, "&nbsp;");
                    });

                return `<pre class="hljs code__pre" ${getStyles(
                    "code_pre"
                )}><code class="language-${lang}" ${getStyles(
                    "code"
                )}>${text}</code></pre>`;
            },
            codespan(text: string) {
                return `<code ${getStyles("codespan")}>${text}</code>`;
            },
            listitem(text: any) {
                if (text.type == 'list_item') {
                    return `<li ${getStyles("listitem")}><span><%s/></span>${text.text}</li>`;
                }
            },
            list(text: any, ordered: any) {
                // const ordered = false;
                text = text.replace(/<\/*p .*?>/g, "").replace(/<\/*p>/g, "");
                let segments = text.split(`<%s/>`);
                if (!ordered) {
                    text = segments.join("• ");
                    return `<ul ${getStyles("ul")}>${text}</ul>`;
                }
                text = segments[0];
                for (let i = 1; i < segments.length; i++) {
                    text = text + i + ". " + segments[i];
                }
                return `<ol ${getStyles("ol")}>${text}</ol>`;
            },
            image(href: string, title: string, text: string) {
                const createSubText = (s: string) => {
                    if (!s) {
                        return "";
                    }

                    return `<figcaption ${getStyles("figcaption")}>${s}</figcaption>`;
                };
                const transform = (title: string, alt: string) => {
                    return alt || title;
                    //  legendOption
                    /** localStorage cannot be used in server-side
                    const legend = localStorage.getItem("legend");
                    switch (legend) {
                        case "alt":
                            return alt;
                        case "title":
                            return title;
                        case "alt-title":
                            return alt || title;
                        case "title-alt":
                            return title || alt;
                        default:
                            return "";
                    } */
                };
                const useReqURL = useRequestURL()
                const hostname = useReqURL.hostname
                const buildMode = process.env.BUILD_MODE
                console.log(' ### buildMode ___>' + buildMode + '    __hostname=' + hostname)

                let hrefAdapt = href
                if (buildMode === 'ghpages' || isGithubHost(hostname)) {
                    hrefAdapt = 'https://raw.githubusercontent.com/aborn/mindpress/main/mindpress-fe/public' + href
                }
                const subText = createSubText(transform(title, text));
                const figureStyles = getStyles("figure");
                const imgStyles = getStyles("image");
                return `<figure ${figureStyles}><img ${imgStyles} src="${hrefAdapt}" title="${title}" alt="${text}"/>${subText}</figure>`;
            },
            link(href: any, title: string, text: string) {
                if (href.startsWith("https://mp.weixin.qq.com")) {
                    return `<a href="${href}" title="${title || text}" ${getStyles(
                        "wx_link"
                    )}>${text}</a>`;
                }
                if (href === text) {
                    return text;
                }
                return `<span ${getStyles("link")}>${text}</span>`;
            },
            strong(text: string) {
                return `<strong ${getStyles("strong")}>${text}</strong>`;
            },
            em(text: string) {
                return `<span style="font-style: italic;">${text}</span>`;
            },
            table(header: any, body: any) {
                return `<section style="padding:0 8px;"><table class="preview-table"><thead ${getStyles(
                    "thead"
                )}>${header}</thead><tbody>${body}</tbody></table></section>`;
            },
            tablecell(text: string) {
                return `<td ${getStyles("td")}>${text}</td>`
            },
            hr(hr: any) {
                console.log(hr)
                return `<hr ${getStyles("hr")}>`
            }
        };

        this.getRenderer = () => {
            return renderer;
        }
    }
}

const buildAddition = () => {
    return `
          <style>
          .preview-wrapper pre::before {
              position: absolute;
              top: 0;
              right: 0;
              color: #ccc;
              text-align: center;
              font-size: 0.8em;
              padding: 5px 10px 0;
              line-height: 15px;
              height: 15px;
              font-weight: 600;
          }
          </style>
      `;
};

const macStyleCodeBlock = () => {
    return `
    <style>
      .hljs.code__pre::before {
        position: initial;
        padding: initial;
        content: '';
        display: block;
        height: 25px;
        background-color: transparent;
        background-image: url("https://doocs.oss-cn-shenzhen.aliyuncs.com/img/123.svg");
        background-position: 14px 10px!important;
        background-repeat: no-repeat;
        background-size: 40px!important;
      }

      .hljs.code__pre {
        padding: 0!important;
      }

      .hljs.code__pre code {
        display: -webkit-box;
        padding: 0.5em 1em 1em;
        overflow-x: auto;
        text-indent: 0;
      }
    </style>
  `
}

const defaultOpts = {
    theme: setColor(config.colorOption[0].value),
    fonts: config.builtinFonts[0].value,
    size: config.sizeOption[3].value,
} as any

const wxRender = new WxRenderer(defaultOpts)
const renderer = wxRender.getRenderer()

export function wxRenderer(mdcontent: string) {
    marked.use({ renderer: renderer })
    let output = marked.parse(mdcontent, { async: false }) + buildAddition() + macStyleCodeBlock()
    return output
}