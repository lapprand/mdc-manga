const { si } = require('nyaapi')

exports.handler = async (event, context) => {
  // "event" has informatiom about the path, body, headers etc of the request
  console.log('event', event)
  // "context" has information about the lambda environment and user details
  console.log('context', context)

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