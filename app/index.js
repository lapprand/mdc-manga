import '@babel/polyfill'
import './src/js/rss-parser';

window.onload = _ => {
    require('./src/js/mdc-hover');
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#content").style.display = "grid";
};