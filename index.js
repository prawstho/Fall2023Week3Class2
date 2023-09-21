const http = require('http');
var fs = require('fs');

const server = http.createServer((request, response) => {
  let path = "./views/";
  console.log(request.url);
  switch(request.url) {
      case '/':
          console.log('top of the localhost:3000 web site')
          path += "index.html";
          console.log(`the path is ${path}`);
          fs.readFile(path, function(err, data) {
              if(err) {
                response.statusCode = 404;
                response.writeHead(response.statusCode, {'Content-Type': 'text/plain'});
                response.write('file not found.');
                response.end();
                console.log(err);
              } else {
                  console.log('file was served.')
                  response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
                  response.write(data);
                  response.end();
              }   
          });
          break;
      case '/test':
          path += "test.html"
          console.log(`the path is ${path}`);
          fs.readFile(path, function(err, data) {
              if(err) {
                response.statusCode = 404;
                response.writeHead(response.statusCode, {'Content-Type': 'text/plain'});
                response.write(`${path} was not found.`);
                response.end();
                console.log(err);
              } else {
                  console.log(`${path} was read.`);
                  // console.log(data);
                  response.statusCode = 200;
                  response.writeHead(response.statusCode, {'Content-Type': 'text/html'})
                  response.write(data);
                  response.end();
              }
          })
          break;
      default:
          console.log('every missing route')
          response.setHeader('Content_Type', 'text/plain');
          response.write('Every missing route!');
          response.end();
          break;
  }
});

server.listen(3000, 'localhost', () => {
  console.log('listening on port 3000.')
});