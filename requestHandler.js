var fs = require('fs');
var formidable = require('formidable');

var IMG_PATH = "test.jpg";

function start(response, request) {
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="upload">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		var path = files.upload.path;
		console.log('upload: path = ' + path);
		fs.renameSync(path, IMG_PATH);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response, request) {
	fs.readFile(IMG_PATH, "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/jpg"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
