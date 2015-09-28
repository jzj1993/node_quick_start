var http = require('http');
var url = require('url');

function start(route, handlers) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(pathname, handlers, request, response);
	}).listen(8888);
	console.log('Server started at port 8888.');
}

exports.start = start;