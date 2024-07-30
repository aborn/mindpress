import defaultTheme from './themes/default-theme'

export const setColor = setColorWithTemplate(defaultTheme)

export function setColorWithTemplate(theme:any) {
    return (color:any) => {
        return createCustomTheme(theme, color)
    }
}

const createCustomTheme = (theme:any, color:any) => {
    const customTheme = JSON.parse(JSON.stringify(theme))
    customTheme.block.h1[`border-bottom`] = `2px solid ${color}`
    customTheme.block.h2[`background`] = color
    customTheme.block.h3[`border-left`] = `3px solid ${color}`
    customTheme.block.h4[`color`] = color
    customTheme.inline.strong[`color`] = color
    return customTheme
}