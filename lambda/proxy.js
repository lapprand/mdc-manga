const { si } = require('nyaapi')

exports.handler = async (event, context) => {
  return si.search('HorribleSubs', 20, {
    filter: 2,
  })
    .then((data) => ({
      statusCode: 200,
      body: `${JSON.stringify(data)}`
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}