const anim = require("@material/animation");
const animEnd = anim.getCorrectEventName(window, "animationend");

// fade in
async function fadeIn(...els: HTMLElement[]) {
    for (let el of els) {
        addFadeIn(el);
        el.addEventListener(animEnd, () => { 
            removeFadeIn(el) 
        });
    }
}

function addFadeIn(el: HTMLElement) {
    el.classList.add("fade-in");
}

function removeFadeIn(el: HTMLElement) {
    el.classList.remove("fade-in");
}

// fade out
async function fadeOut(els: HTMLElement[]) {
    for (let el of els) {
        addFadeOut(el);
        el.addEventListener(animEnd, () => { 
            removeFadeOut(el);
        });
    }
}

function addFadeOut(el: HTMLElement) {
    el.classList.add("fade-out");
}

function removeFadeOut(el: HTMLElement) {
    el.classList.remove("fade-out");
}

export { fadeIn, fadeOut };