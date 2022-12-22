/* eslint-disable */
/* class CardInput */
import Visa from '../public/assets/images/cards/Visa.svg';
import Mastercard from "../public/assets/images/cards/MasterCard.svg";
import Amex from "../public/assets/images/cards/AmericanExpress.svg";
import Discover from '../public/assets/images/cards/Discover.svg';
import Unionpay from '../public/assets/images/cards/UnionPay.svg';
import Jcb from '../public/assets/images/cards/JCB.svg';
import Dankort from '../public/assets/images/cards/dankort.svg';
import DinersClub from '../public/assets/images/cards/DinersClub.svg';
import Unknown from '../public/assets/images/cards/Unknown.svg';

const cardImages = {
    // SVGICONS
    visa: Visa,
    mastercard: Mastercard,
    amex: Amex,
    discover: Discover,
    unionpay: Unionpay,
    jcb: Jcb,
    dankort: Dankort,
    dinersclub: DinersClub,
    unknown: Unknown
}
let DEFAULT_CVC_LENGTH = 3;
let DEFAULT_ZIP_LENGTH = 5;
let DEFAULT_CARD_FORMAT = /(\d{1,4})/g;

let CARD_TYPES = [{
    type: 'amex',
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    startPattern: /^3[47]/,
    maxCardNumberLength: 15,
    cvcLength: 4,
    cardInputMask: '9999 999999 99999'
}, {
    type: 'dankort',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^5019/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'hipercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'dinersclub',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(36|38|30[0-5])/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'discover',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6011|65|64[4-9]|622)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'jcb',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^35/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'laser',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6706|6771|6709)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'maestro',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'mastercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'unionpay',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^62/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    luhn: false,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'visaelectron',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4(026|17500|405|508|844|91[37])/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'elo',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}, {
    type: 'visa',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH,
    cardInputMask: '9999 9999 9999 9999'
}];
let getCardTypeByType = function getCardTypeByType(type) {
    return CARD_TYPES.filter(function (cardType) {
        return cardType.type === type;
    })[0];
};

let getCardTypeByValue = function getCardTypeByValue(value) {
    return CARD_TYPES.filter(function (cardType) {
        return cardType.startPattern.test(value);
    })[0];
};

/*  ---------  card Expiry --------- */

let isExpiryInvalid = (expiryDate) => {
    let ERROR_TEXT__INVALID_EXPIRY_DATE = 'Expiry date is invalid';
    let ERROR_TEXT__MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
    let ERROR_TEXT__YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
    let ERROR_TEXT__DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';
    let EXPIRY_DATE_REGEX = /^(\d{2})\/(\d{4}|\d{2})$/;
    let MONTH_REGEX = /(0[1-9]|1[0-2])/;
    //   let customExpiryErrorTexts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    let splitDate = expiryDate.split('/');
    if (!EXPIRY_DATE_REGEX.test(expiryDate)) {
        return ERROR_TEXT__INVALID_EXPIRY_DATE;
    }

    let expiryMonth = splitDate[0];
    if (!MONTH_REGEX.test(expiryMonth)) {
        return ERROR_TEXT__MONTH_OUT_OF_RANGE;
    }

    let expiryYear = splitDate[1];
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    currentYear = parseInt(expiryYear.length === 4 ? currentYear : currentYear.toString().substr(-2), 10);
    if (currentYear > parseInt(expiryYear, 10)) {
        return ERROR_TEXT__YEAR_OUT_OF_RANGE;
    }

    if (parseInt(expiryYear, 10) === currentYear && parseInt(expiryMonth, 10) < currentMonth) {
        return ERROR_TEXT__DATE_OUT_OF_RANGE;
    }
}

export { cardImages, getCardTypeByType, getCardTypeByValue, isExpiryInvalid, CARD_TYPES }