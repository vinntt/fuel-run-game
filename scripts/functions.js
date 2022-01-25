function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getHeight(width, originalWidth, originalHeight) {
    return width * originalHeight / originalWidth
}

function maxBetween(a, b) {
    if (a > b) {
        return a;
    }

    return b;
}

function minBetween(a, b) {
    if (a < b) {
        return a;
    }

    return b;
}