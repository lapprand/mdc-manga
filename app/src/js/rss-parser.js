let Parser = require('rss-parser');
let parser = new Parser();
 
(async () => {
 
  let feed = await parser.parseURL('https://www.horriblesubs.info/rss.php?res=720');
//   let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);
 
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
 
})();