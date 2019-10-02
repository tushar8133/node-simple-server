var http = require('http');
var url = require('url');
var events = require('events');
var fs = require('fs');

var server = http.createServer(function(req, res){
	
	var parsedUrl = url.parse(req.url, true);
	var payload = '';

	req.on('data', function(data){
		payload += data;
	});

	req.on('end', function(){

		var router = pageRouter(req.url);
		
		res.writeHead(200, {'Content-Type':'text/html'});

		readHtmlFile(router).then(function(data){
			res.write(data);
			res.end();
		}).catch(function(err){
			res.write(err);
			res.end();
		})

	});

})

function pageRouter(path){
	var pageName;
	switch(path){
		case '/' : pageName = 'index'; break;
		case '/home' : pageName = 'index'; break;
		case '/index' : pageName = 'index'; break;
		case '/default' : pageName = 'index'; break;
		case '/gallery' : pageName = 'gallery'; break;
		default : pageName = 'error'; break;
	}
	return pageName;
}

function readHtmlFile(_pageName){
	return new Promise(function(reject, resolve){
		fs.readFile('./'+_pageName+'.html', function(err, html){
			if(err){
				reject(err);
			}else{
				resolve(html);
			}
		});
	})	
}

server.listen(3000, "127.0.0.1", function(){
	console.log("listening...");
})

process.on('unhandledRejection', err => {});