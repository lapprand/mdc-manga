const { si } = require('nyaapi')

exports.handler = async (event, context) => {
  let params = event.queryStringParameters;
  return si.searchPage(params.term, params.n, {
    filter: params.filter,
  })
    .then((data) => ({
      statusCode: 200,
      body: `${JSON.stringify(data)}`
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}