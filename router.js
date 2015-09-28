
function route (pathname, handlers, request, response) {
	if (typeof handlers[pathname] === 'function') {
		console.log('route: path = ' + pathname);
		handlers[pathname](response, request);
	} else {
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;