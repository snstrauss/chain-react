export function randomEnum(enumObj) {
    const keys = Object.keys(enumObj);
    const rand = Math.floor(Math.random() * (keys.length));
    const val = enumObj[keys[rand]];
    return val;
}

export function isInRange(min, max, num) {
    return num >= min && num < max;
}
