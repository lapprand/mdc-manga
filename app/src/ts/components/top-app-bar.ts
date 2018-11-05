const mdcTopAppBar = require("@material/top-app-bar/index");

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdcTopAppBar.MDCTopAppBar(topAppBarElement);

let scrollTop, clientHeight;
function checkCollapse() {
    scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    clientHeight = window.innerHeight;
    // console.log(scrollTop + "+" + clientHeight + " = " + (scrollTop + clientHeight) + " = " + scrollHeight);
    // if (topAppBarElement.classList.contains("mdc-top-app-bar--short-collapsed")) {

    // };
    // if (scrollTop > 0) {
    //     topAppBarElement.classList.add("mdc-top-app-bar--short-collapsed");
    // } else {
    //     topAppBarElement.classList.remove("mdc-top-app-bar--short-collapsed");
    // }
}

// window.addEventListener("scroll", checkCollapse);
// window.addEventListener("touchmove", checkCollapse);