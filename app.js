/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "loadingEnv" }] */
import http from 'http';
import url from 'url';

import loadingEnv from './loading_env';
import TodoController from './lib/controllers/todo';
import { renderJsonResponse } from './lib/utils/res';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  if (/^\/todo/.test(parsedUrl.path)) {
    if (req.method === 'GET') {
      // TodoController.get return promise;
      TodoController.get(req, res);
    } else if (req.method === 'POST') {
      // TodoController.get return promise;
      TodoController.create(req, res);
    } else {
      renderJsonResponse(res, {
        success: false,
        errors: [
          { message: 'Invalid Request!' },
        ],
      }, 400);
    }
  } else {
    renderJsonResponse(res, {
      success: false,
      errors: [
        { message: 'Invalid Request!' },
      ],
    }, 400);
  }
});

server.listen(8000);
