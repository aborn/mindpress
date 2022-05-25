import hl from './hl'

export async function parseText(content: any) {
    const parsed = await parseMdContent(DEMO_TEXT_MARKDOWN);    
    //const parsedHighlight = await hl.transform(parsed)
    return parsed;
}