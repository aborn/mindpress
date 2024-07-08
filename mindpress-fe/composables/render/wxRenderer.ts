import { marked } from "marked";
import { config } from './config'
import { setColor } from './util'

class WxRenderer {
    getRenderer: Function
    styleMapping: Map<any, any>
    constructor(opt) {
        const buildTheme = (themeTpl: any) => {
            let mapping = {} as any;
            let merge = (base: any, extend: any) => Object.assign({}, base, extend);

            let base = merge(themeTpl.BASE, {
                "font-family": config.builtinFonts[0].value,
                "font-size": config.sizeOption[2].value,
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
        console.log(this.styleMapping)

        const getStyles = (tokenName: any, addition: any = '') => {
            let arr = [];
            console.log(this.styleMapping)
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
            }
        };

        this.getRenderer = () => {
            return renderer;
        }
    }
}

export function wxRenderer(mdcontent: string) {
    const opt = {
        theme: setColor(config.colorOption[0].value),
        fonts: config.builtinFonts[0].value,
        size: config.sizeOption[2].value,
    } as any
    const wxRender = new WxRenderer(opt)
    marked.use({ renderer: wxRender.getRenderer() })
    return marked.parse(mdcontent, { async: false })
}