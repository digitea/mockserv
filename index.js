const http = require('http');
const port = 2640;

/**
 * Get parsed parameters from a request url.
 * 
 * @param  {Object} request Request.
 * @return {Object}         Parsed request parameters.
 */
const parseParams = function (request) {
  let query = request.url.split('?');
  let result = {};

  if (query.length >= 2) {
    query[1].split('&').forEach(item => {
      try {
        result[item.split('=')[0]] = item.split('=')[1]
      } catch (e) {
        result[item.split('=')[0]] = ''
      }
    })
  }

  return result
}

/**
 * Handler for incoming requests.
 * 
 * @param  {Object} request  Request.
 * @param  {Object} response Response.
 */
const requestHandler = (request, response) => {
  const params = parseParams(request)
  const url = request.url.indexOf('?') !== -1
    ? request.url.substr(0, request.url.indexOf('?'))
    : request.url

  console.log(`${url}: ${JSON.stringify(params)}`)
  response.end(`mockserv: ${url}`)
}

const server = http.createServer(requestHandler)

server.listen(port, error => {
  if (error) {
    return console.log('something bad happened', error)
  }

  console.log(`mockserv has started, and is now listening on ${port}.`)
  console.log('Incoming requests will be logged below.')
})
