interface MindPressConfStrut {
    title: string
    token: string
    author: string
}

export const DEFAULTCONF: MindPressConfStrut = {
    "title": "MindPress",
    "token": "",   // no need for validation for default.
    "author": "Aborn Jiang"
}

export const CONFIG_FILE_NAME = 'mindpress.conf';