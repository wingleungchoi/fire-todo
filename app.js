/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "loadingEnv" }] */
import http from 'http';
import url from 'url';

import loadingEnv from './loading_env';
import TodoController from './lib/controllers/todo';
import { renderJsonResponse } from './lib/utils/res';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  if (/^\/todos/.test(parsedUrl.path)) {
    if (req.method === 'GET') {
      // TodoController.get return promise;
      TodoController.index(req, res);
    } else {
      renderJsonResponse(res, {
        success: false,
        errors: [
          { message: 'Invalid Request!' },
        ],
      }, 400);
    }
  } else if (/^\/todo/.test(parsedUrl.path)) {
    if (req.method === 'GET') {
      // TodoController.get return promise;
      TodoController.get(req, res);
    } else if (req.method === 'POST') {
      // TodoController.get return promise;
      TodoController.create(req, res);
      // https://stackoverflow.com/questions/24241893/rest-api-patch-or-put
      // The PATCH method is the correct choice here
      // as you're updating an existing resource - the group ID.
      // PUT should only be used if you're replacing a resource in it's entirety.
      // As currently, FireBase is likely behaving as PATCH.
      // Therefore, No PUT is allowed
    } else if (req.method === 'PATCH') {
      // TodoController.get return promise;
      TodoController.update(req, res);
    } else if (req.method === 'DELETE') {
      // TodoController.get return promise;
      TodoController.delete(req, res);
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
