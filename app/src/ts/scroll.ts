const MDCRipple = require("@material/ripple");

var scrollIndicator = document.querySelector('.mdc-fab');
var scrollHeight = document.documentElement.scrollHeight;

const fabRipple = new MDCRipple(scrollIndicator);

scrollIndicator.addEventListener('click', function () {
    window.scrollTo(0, scrollHeight);
});

function checkScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = scrollHeight - window.innerHeight;
    // var scrolled = (winScroll / height) * 100;
    console.log(scrollHeight)
    if (winScroll < 50 && winScroll != height) {
        scrollIndicator.classList.remove('mdc-fab--exited');
    } else {
        scrollIndicator.classList.add('mdc-fab--exited');
    }
}

function resizeChecks() {
    scrollHeight = document.documentElement.scrollHeight;
    checkScroll();
}

window.onscroll = checkScroll;
window.onresize = resizeChecks;

checkScroll();