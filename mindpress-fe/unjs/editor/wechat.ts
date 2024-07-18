import juice from 'juice'
import { showToast } from '../utils/utils'

export function solveWeChatImage() {
    const clipboardDiv = document.getElementById(`output`) as any
    const images = clipboardDiv.getElementsByTagName(`img`)
    for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const width = image.getAttribute(`width`)
        const height = image.getAttribute(`height`)
        image.removeAttribute(`width`)
        image.removeAttribute(`height`)
        image.style.width = width
        image.style.height = height
    }
}

export function mergeCss(html: any) {
    return juice(html, {
        inlinePseudoElements: true,
        preserveImportant: true,
    })
}

export function copyToWechat(output: any) {
    setTimeout(() => {
        function modifyHtmlStructure(htmlString: any) {
            // 创建一个 div 元素来暂存原始 HTML 字符串
            const tempDiv = document.createElement(`div`)
            tempDiv.innerHTML = htmlString

            const originalItems = tempDiv.querySelectorAll(`li > ul, li > ol`)

            originalItems.forEach((originalItem: any) => {
                originalItem.parentElement.insertAdjacentElement(
                    `afterend`,
                    originalItem
                )
            })

            // 返回修改后的 HTML 字符串
            return tempDiv.innerHTML
        }

        solveWeChatImage()

        const clipboardDiv = document.getElementById(`output`) as any
        console.log(clipboardDiv)

        clipboardDiv.innerHTML = mergeCss(clipboardDiv.innerHTML)
        clipboardDiv.innerHTML = modifyHtmlStructure(clipboardDiv.innerHTML)

        // 调整 katex 公式元素为行内标签，目的是兼容微信公众号渲染
        clipboardDiv.innerHTML = clipboardDiv.innerHTML
            .replace(
                /class="base"( style="display: inline")*/g,
                `class="base" style="display: inline"`
            )
            // 公众号不支持 position， 转换为等价的 translateY
            .replace(/top:(.*?)em/g, `transform: translateY($1em)`)
        clipboardDiv.focus()
        window.getSelection().removeAllRanges()
        let range = document.createRange()

        range.setStartBefore(clipboardDiv.firstChild)
        range.setEndAfter(clipboardDiv.lastChild)
        window.getSelection().addRange(range)
        document.execCommand(`copy`)
        window.getSelection().removeAllRanges()
        clipboardDiv.innerHTML = output
        
        showToast({ title: '已复制渲染后的文章到剪贴板，可直接到公众号后台粘贴！' })
        console.log('copy finished!')
    }, 350)
}