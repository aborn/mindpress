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
    const imagePath = path.join(process.cwd(), 'public/' + IMAGE_UPLOAD_PATH)
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
            && imageUrl.includes('jianshu')
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
        const filePath = path.join(process.cwd(), 'public', IMAGE_UPLOAD_PATH, fileName)
        console.log(filePath)

        const file = fs.createWriteStream(filePath);
        // async
        /**https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Image downloaded as ${filePath}`);
            });
        }).on('error', err => {
            fs.unlink(filePath, (err: any) => {
                console.error(err)
            });
            console.error(`Error downloading image: ${err.message}`);
        });*/

        // sync
        const pro = await buildPromise(url, file, filePath);
        console.log('---++++++ pro')
        console.log(pro)

        // use axios download
        /**
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        console.log(response)
        fs.writeFile(filePath, response.data, (err: any) => {
            if (err) throw err;
            console.log('Image downloaded successfully!');
        });
        */
        return '/' + IMAGE_UPLOAD_PATH + '/' + fileName
    } catch (err) {
        console.log(err)
        return null
    }
}

async function buildPromise(url: string, file: any, filePath: string) {
    let result = await new Promise(function (resolve, reject) {
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