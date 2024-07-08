import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import https from 'https'

export function generatePermalinkHash(len: number = 16) {
    const uuid = uuidv4();
    const permalink = uuid.replace(/-/g, '');
    return permalink.length > len ? permalink.substring(permalink.length - len) : permalink
}

export const MD_DIVIDER = '<!-- Content of the page -->';
export const IMAGE_UPLOAD_PATH = "uploads"
export const MINDPRESS_ROOT_PATH = "mindpress"

export function extractBody(content: string | null) {
    if (!content) { return '' }
    let idx = content.lastIndexOf(MD_DIVIDER);
    return (idx >= 0) ? content.substring(idx + MD_DIVIDER.length + 1) : content
}

export interface IdxStruct {
    s: number,
    e: number
}

export function hightlightTitle(indexes: IdxStruct[] | void, value: string) {
    if ((!indexes) || (indexes && indexes.length <= 0)) { return value }
    let array = []
    let startIdx = 0;
    indexes.forEach(idx => {
        array.push(value.substring(startIdx, idx.s))
        const searchKey = value.substring(idx.s, idx.e)
        const highlight = '<span style="color:red">' + searchKey + '</span>';
        array.push(highlight)
        startIdx = idx.e
    })
    array.push(value.substring(startIdx, value.length))
    return array.join('')
}

export function extraWithSurroundings(idx: IdxStruct, value: string) {
    const searchKey = value.substring(idx.s, idx.e);
    const highlight = '<span style="color:red">' + searchKey + '</span>';
    const searchBackLength = 10;
    const startIdx = (idx.s - searchBackLength) >= 0 ? idx.s - searchBackLength : 0;
    let result = value.substring(startIdx, idx.s) + highlight;
    const searchFowardLength = 10;
    const maxIdx = (idx.e + 1 + searchFowardLength)
    const endIdx = maxIdx > value.length ? value.length : maxIdx;
    return result + value.substring(idx.e + 1, endIdx)
}

export function makeSureImagePathExists() {
    const imagePath = path.join(process.cwd(), MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH)
    if (!fs.existsSync(imagePath)) {
        console.log(imagePath + ' doesnot exists! now create it!')
        fs.mkdirSync(imagePath, { recursive: true });
    }
}

export function imageMatches(content: string) {
    const regex = /\!\[(.*?)\]\((.*?)\)/gm
    let matche;
    const matches = []
    while ((matche = regex.exec(content)) !== null) {
        matches.push(matche)
    }

    const filterMatches = matches.filter(i => {
        const imageUrl = i[2] as string;
        return (imageUrl.includes('http:') || imageUrl.includes('https:'))
            && (imageUrl.includes('jianshu') || imageUrl.includes('csdnimg'))
    })

    return filterMatches;
}

export async function downloadImageAndReplaseContent(content: string) {
    makeSureImagePathExists()
    const filterMatches = imageMatches(content) as any[];
    if (!filterMatches || filterMatches.length == 0) {
        return {
            state: false,
            content
        };
    }

    const fileNameMaps = {} as any;
    await Promise.all(
        filterMatches.map(async (item: any) => {
            const imageUrl = item[2]
            const fileName = await downloadImage(imageUrl)
            if (!fileName) {
                console.warn('file:' + imageUrl + ', download failed')
            } else {
                fileNameMaps[imageUrl] = fileName
            }
        })
    )

    console.log('----tips: download images finished')
    filterMatches.forEach(item => {
        const originImageUrl = item[2]
        const destPath = fileNameMaps[originImageUrl]
        if (destPath) {
            content = content.replace(
                '](' + originImageUrl,
                '](' + destPath
            )
        }
    })
    return {
        state: true,
        content
    };
}

export async function downloadImage(url: string) {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const paths = pathname.split('.');
        const imagePostfix = paths.length > 1 ? paths[1] : null
        if (!imagePostfix) {
            return null;
        }
        console.log('--------download image-----')
        console.log(url)
        const fileName = generatePermalinkHash(32) + "." + imagePostfix;
        console.log(fileName)
        const filePath = path.join(process.cwd(), MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH, fileName)
        console.log(filePath)

        const file = fs.createWriteStream(filePath);
        const res = await downloadImageHttps(url, file, filePath);
        console.log('---++++++ downloadImageHttps:' + res)
        return buildImageUrl(IMAGE_UPLOAD_PATH, fileName)
    } catch (err) {
        console.log(err)
        return null
    }
}

export function buildImageUrl(dir: string, fileName: string): string {
    return '/file/' + dir + '/' + fileName;
}

export async function downloadImageAxios(url: string) {
    if (!url || url.length == 0) {
        return ''
    }

    // use axios download
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const paths = pathname.split('.');
    const imagePostfix = paths.length > 1 ? paths[1] : null
    if (!imagePostfix) {
        return null;
    }
    const fileName = generatePermalinkHash(32) + "." + imagePostfix;
    const filePath = path.join(process.cwd(), 'public', IMAGE_UPLOAD_PATH, fileName)

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    // Error -- > Client network socket disconnected before secure TLS connection was established if used proxy!!!
    try {
        fs.writeFileSync(filePath, response.data);
        if (fs.existsSync(filePath)) {
            console.log(`download image ${url} success`)
        } else {
            console.error(`download image ${url} failed!`)
        }
    } catch (err) {
        console.error(`download image ${url} failed! reason:${err}`)
    }

    return '/' + IMAGE_UPLOAD_PATH + '/' + fileName
}

async function downloadImageHttps(url: string, file: any, filePath: string) {
    const result = await new Promise(function (resolve, reject) {
        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Image downloaded as ${filePath}`);
                resolve(filePath)
            });
        }).on('error', err => {
            fs.unlink(filePath, (err: any) => {
                console.error(err)
            });
            console.error(`Error downloading image: ${err.message}`);
            reject(err)
        });
    })
    return result;
}

export function buildHeaderArray(arrayVal: any[]) {
    if (arrayVal.length == 0) {
        return ''
    }

    let initValue = '\n';
    arrayVal.forEach(item => {
        initValue = initValue + "  - " + item + "\n"
    })
    return initValue
}

export function permalinkAdapt(link: string) {
    const prefix = "/article/"
    if (link.startsWith(prefix)) {
        return "/md/" + link.substring(prefix.length)
    }

    return link;
}