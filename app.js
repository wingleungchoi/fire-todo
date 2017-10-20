import dotenv from 'dotenv';
import http from 'http';

// setup environment environement
dotenv.config();

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });
  response.end('Welcome to TODO (base in firebase)\n');
});

server.listen(8000);
