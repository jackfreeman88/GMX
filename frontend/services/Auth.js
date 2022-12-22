import cookie from "react-cookies";
import moment from "moment";
import CryptoJS from "crypto-js";
import { roles } from './Role'
const appSecret = "gmx-secret";
const appCookie = "gmx";
const expires = moment().add(3, "days").toDate();

const encodeData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), appSecret).toString();
}
const decodeData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, appSecret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
const saveData = (data, remember = false) => {
    let userData = {
        isLogin: "1",
        token: data.access_token.toString(),
        userId: data.user.id,
        role: data.user.role,
        slug: data.user.slug,
        // userName: data.user.firstName + (data.user.lastName !== null ? ' '+ data.user.lastName : ''),
        userName: data.user.businessName,
        fullName: data.user.role == roles.brand ? data.user.brandName : data.user.businessName,
        userImage: data.user.profilePath !== null ? data.user.profilePath : (data.user.role == roles.brand ? '/profile/seller-default.png' : '/profile/no-profile-image.jpg'),
    };
    let timeout = remember ? moment().add(1, "year").toDate() : expires;
    cookie.save(appCookie, encodeData(userData), { path: "/", expires: timeout });
}
const getSingle = (name) => {
    const cookieData = cookie.load(appCookie);
    if (cookieData !== undefined) {
        let userData = decodeData(cookieData);
        return Object.assign([], userData)[name];
    } else {
        return false;
    }
}
const updateSingle = (name, value) => {
    if (cookie.load(appCookie) !== undefined) {
        let userData = decodeData(cookie.load(appCookie));
        userData[`${name}`] = "" + value.toString();
        cookie.save(appCookie, encodeData(userData), { path: "/", expires });
    } else {
        return false;
    }
}
const isLoggedIn = () => {
    return getSingle("isLogin") === "1";
}
const logout = async () => {
    await cookie.remove(appCookie, { path: '/' });
}

const contextCookie = (context, name) => {
    const cookieData = context.req.cookies[appCookie];
    if (cookieData !== undefined) {
        let userData = decodeData(cookieData);
        return Object.assign([], userData)[name];
    } else {
        return false;
    }
}

export { encodeData, decodeData, saveData, getSingle, updateSingle, isLoggedIn, logout, contextCookie };