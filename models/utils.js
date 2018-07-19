import Config from "../config";
import MD5 from "md5"

export function yocEncript(val) {
    let charResult = [];
    val = val.replace(/1/g, Config.WebCode);
    for (let i = 0; i < val.length; i++) {
        let charcode = val.charCodeAt(i);
        charResult.push(charcode);
    }

    return charResult.join("&");
}

export function yocDecrypt(val) {
    let code = val.split("&");
    let str = "";
    for (let i = 0; i < code.length; i++) {
        str += String.fromCharCode(parseInt(code[i]));
    }

    return str.replace(/SamYoc/g, "1");
}

export function sign(params) {
    let str = "";
    for (let item in params) {
        str += `${item}=${params[item]}&`;
    }

    str += `secret_key=${getSecretKey()}`;

    return MD5(str).toUpperCase();
}

export function signGet(params) {
    return {
        params,
        headers: {
            authorization: sign(params)
        }
    }
}

export function parseNumber(str) {
    let result = parseFloat(str);
    if (isNaN(result)) {
        return 0.0;
    }

    return result;
}

export function numberFixed(number, count) {
    count = parseInt(count);
    let numResult = parseNumber(number).toFixed(count + 1);
    return parseNumber(numResult.substring(0, numResult.lastIndexOf('.') + count + 1));
}

//必须执行到成功
export function definite(targetPromise) {
    const checkMethod = (resolve, reject) => {
        targetPromise.then(mres => {
            resolve(mres);
        }).catch((e) => {
            checkMethod(resolve, reject);
        });;
    }

    return new Promise((resolve, reject) => {
        checkMethod(resolve, reject);
    });
}

export function alwaysThread(thread, time) {
    let ctime = time;
    if (typeof time === "function") {
        ctime = time();
    }

    thread();

    setTimeout(() => {
        alwaysThread(thread, time);
    }, ctime);
}

export function getAccessId() {
    return Config.access_id;
}

export function getSecretKey() {
    return yocDecrypt(Config.secret_key);
}

export function hideString(val) {
    let origin = val;
    return origin.substr(0, parseInt(origin.split('').length / 2 - origin.split('').length/4)) + '******' + origin.substr(parseInt(origin.split('').length / 2 + origin.split('').length/4), origin.split('').length)
}