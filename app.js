import http from 'http';

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });
  response.end('Welcome to TODO (base in firebase)\n');
});

server.listen(8000);
