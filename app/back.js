var express = require('express')
var app = express()
const { si } = require('nyaapi')

app.get('/proxy', function (req, res, next) {
  si.search('HorribleSubs', 20, {
    filter: 2,
  })
    .then((data) => { res.send(data) })
    .catch((err) => console.log(err))
})

app.listen(80, function () {
  console.log('Server listening on port 80')
})