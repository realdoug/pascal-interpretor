export function isAlnum(aChar) {
    return (isDigit(aChar) || isAlpha(aChar));
}

export function isDigit(aChar) {
    let myCharCode = aChar.charCodeAt(0);

    if ((myCharCode > 47) && (myCharCode < 58)) {
        return true;
    }

    return false;
}

export function isAlpha(aChar) {
    let myCharCode = aChar.charCodeAt(0);

    if (((myCharCode > 64) && (myCharCode < 91)) ||
        ((myCharCode > 96) && (myCharCode < 123))) {
        return true;
    }

    return false;
}