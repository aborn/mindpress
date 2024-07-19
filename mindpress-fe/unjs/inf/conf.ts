interface MindPressConfStrut {
    title: string
    token: string
    author: string
}

const DEFAULTCONF: MindPressConfStrut = {
    "title": "MindPress",
    "token": "",
    "author": "Aborn Jiang"
}

export const CONFIG_FILE_NAME = 'mindpress.conf';