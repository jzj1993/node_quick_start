# Node入门学习

## HTTP Server

`server.js`

```js
var http = require('http');

http.createServer( function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello');
    response.end();
}).listen(8888);
```

运行`node server.js`启动服务器

## 模块导出

`server.js`
```js
function start() {
	// ...
}
exports.start = start;
```

`index.js`
```js
var server = require("./server");

server.start();
```

## URL路由

```js
var url = require("url");

var pathname = url.parse(request.url).pathname;
```

## 404页面输出

```js
response.writeHead(404, {"Content-Type": "text/plain"});
response.write("404 Not found");
response.end();
```

## 利用`exec`执行shell指令

```js
var exec = require("child_process").exec;

exec("ls -lah", function (error, stdout, stderr) {
      content = stdout;
});
```

## 变量类型检测

```js
if (typeof obj === 'function') {}
```

## 图片上传

### HTML上传表单

`multipart`, `post`方法, `action`为`/upload`

```html
<form action="/upload" enctype="multipart/form-data" method="post">
    <input type="file" name="upload">
    <input type="submit" value="Upload file" />
</form>
```

### `/upload`

利用`formidable`处理上传的文件，使用`fs`保存到指定路径。返回`/show`显示图片。

```js
var formidable = require("formidable");
var fs = require("fs");

function upload(response, request) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		var path = files.upload.path;
		console.log('upload: path = ' + path);
		fs.renameSync(path, "/tmp/test.jpg");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}
```

### `/show`

```js
function show(response, request) {
	fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
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
```

