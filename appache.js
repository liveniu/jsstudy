var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url')
//var test2 = require('./test2.js')
var querystring = require('querystring')

http.createServer(function(req, res) {
	//test2
	var urlobj = (url.parse(req.url))
	var filename = urlobj.pathname
	console.log(filename + req.method)
	var jsonobject = JSON.parse('[{"id":18,"name":"张三"},{"id":21,"name":"李四"}]');
	// console.log(jsonobject.length)
	if (filename === '/test2' && req.method === 'GET') {
		var urlqueryobject = url.parse(req.url.toLowerCase(), true).query
		var queryint = parseInt(urlqueryobject.id)
		if (queryint) {
			for (var i = 0; i < jsonobject.length; i++) {
				if (jsonobject[i].id == queryint) {
					//					console.log(JSON.stringify(jsonobject[i].id))
					var result = '[' + JSON.stringify(jsonobject[i])+']'
					res.setHeader('Content-Type', 'application/json');
					res.end(result)
				}
			}
		} else {
			res.end(JSON.stringify(jsonobject))
		}
	} else if (filename === '/test2' && req.method === 'POST') {
		var poststring = ''
		req.on('data', (chunk) => {
			poststring += chunk.toString('utf8')
		})
		req.on('end', () => {
			queryint = parseInt(querystring.parse(poststring).id)
			console.log(poststring)
			if (queryint) {
				for (var i = 0; i < jsonobject.length; i++) {
					if (jsonobject[i].id == queryint) {
						console.log(JSON.stringify(jsonobject[i].id))
						var result = '[' + JSON.stringify(jsonobject[i])+']'
						console.log(result)
						// res.setHeader('Content-Type', 'application/json');
						res.end(result)
					}
				}
			} else {
				res.end(JSON.stringify(jsonobject))
			}
		})
	}


	var publicpath = path.join(__dirname, 'html', req.url)
	if (req.url == '/') {
		console.log(publicpath)
		publicpath = publicpath + 'index.html';
	}

	fs.readFile(publicpath, function(err, data) {
		if (err) {
			console.log('404 not found');
			res.end('404 not found!')
		} else {
			res.setHeader('Content-Type', mime.getType(publicpath));
			res.end(data);
		}
	})

}).listen(8080, function() {
	console.log('http://localhost:8080 started');
})
