import { isString } from './utils'

export const dateFormat = (date: Date, fullFormat: boolean = false) => {
    if (!date) {
        date = new Date();
    }
    return fullFormat ? date.format("yyyy-MM-dd hh:mm:ss.S") : date.format("yyyy-MM-dd hh:mm:ss");
}

export const diffSecond = (date: Date | String, currentDate: Date = new Date()) => {
    const d = isString(date) ? new Date(date as string) : date as Date
    let diffSecond =
        (currentDate.getTime() - d.getTime()) / 1000;
    return Math.round(diffSecond)
}

export const diffHour = (date: Date | String, currentDate: Date = new Date()) => {
    if (!date) { return 0; }
    const dS = diffSecond(date, currentDate);
    return dS / 3600
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}