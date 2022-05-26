import shiki from "./shiki"

export async function parseText(content: any) {
    const parsed = await parseMdContent(DEMO_TEXT_MARKDOWN);
    const parsedHighlight = await shiki.transform(parsed)
    return parsed;
}