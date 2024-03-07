import { discoBackground, discoColor } from "../globalElements/constants";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let discoIntervalColor:NodeJS.Timeout | null= null;
let discoIntervalBbackground:NodeJS.Timeout | null= null;


export function startDiscoColor() {
    const elements:NodeListOf<HTMLElement> = document.querySelectorAll('.' + discoColor);
    if (elements.length > 0) { 
        discoIntervalColor = setInterval(() => {
            elements.forEach((element) => {
                (element).style.color = getRandomColor();
            });
        }, 150);
    }
}

export function stopDiscoColor(originalColor: string = "") {
    if (discoIntervalColor !== null) {
        clearInterval(discoIntervalColor);
        discoIntervalColor = null;

        const elements:NodeListOf<HTMLElement> = document.querySelectorAll('.' + discoColor);
        elements.forEach((element) => {
            (element).style.color = originalColor;
        });
    }
}

export function startDiscoBackground() {
    const elements = document.querySelectorAll('.' + discoBackground);
    if (elements.length > 0) {
        discoIntervalBbackground = setInterval(() => {
            elements.forEach((element) => {
                (element as HTMLElement).style.backgroundColor = getRandomColor();
            });
        }, 150);
    }
}

export function stopDiscoBackground(originalColor: string = "") {
    if (discoIntervalBbackground !== null) {
        clearInterval(discoIntervalBbackground);
        discoIntervalBbackground = null;

        const elements = document.querySelectorAll('.' + discoBackground);
        elements.forEach((element) => {
            (element as HTMLElement).style.backgroundColor = originalColor;
        });
    }
}