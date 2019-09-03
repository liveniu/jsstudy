var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

http.createServer(function(req, res) {
	var filepath = path.join(__dirname, 'html', req.url)

	if (!fs.existsSync(filepath)) {
		filepath = path.join(__dirname, 'html', '404.html')
	}
	console.log(filepath.toString());

	fs.readFile(filepath, function(err, data) {
		if (err) {
			res.setHeader('Content-type', 'text-plain; charset = utf-8');
			console.log("wrong" + err);
			res.end('文件不存在 404');
		} else {
			res.setHeader('Content-type', mime.getType(filepath));
			res.end(data)
		}
	});
}).listen(9090, function() {
	console.log('http://localhost:9090')
})
