let Parser = require('rss-parser');
let parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

(async () => {

  let feed = await parser.parseURL(CORS_PROXY + 'https://nyaa.si/?page=rss&c=1_2&f=2');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });

})();