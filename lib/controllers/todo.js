import url from 'url';

import TodoRepo from '../repo/todo';
import { renderJsonResponse } from '../utils/res';

const todoPath = '/todo/';

class TodoController {
  static async get(req, res) {
    const parsedUrl = url.parse(req.url);
    const id = parsedUrl.path.substring(todoPath.length, parsedUrl.path.length);
    console.log('id', id);
    const todo = await TodoRepo.findById(id);
    if (todo === null) {
      renderJsonResponse(res, {
        success: false,
        errors: [
          { message: 'No Todo is Found' },
        ],
      }, 400);
    }
    renderJsonResponse(res, todo, 200);
  }

  static async create(req, res) {
    let body = '';
    req.on('data', (data) => {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', () => {
      const bodyObj = JSON.parse(body);
      // use TodoJson['blah'], etc.
      TodoRepo.insert(bodyObj).then((todo) => {
        console.log('todo', todo);
        if (todo === null) {
          renderJsonResponse(res, {
            success: false,
            errors: [
              { message: 'Todo cannot be created' },
            ],
          }, 400);
        }
        renderJsonResponse(res, todo, 200);
      });
    });
  }

  static async update(req, res) {
    let body = '';
    req.on('data', (data) => {
      body += data;
      // Too much PATCH data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', () => {
      const bodyObj = JSON.parse(body);
      // use TodoJson['blah'], etc.
      TodoRepo.update(bodyObj).then((todo) => {
        console.log('todo', todo);
        if (todo === null) {
          renderJsonResponse(res, {
            success: false,
            errors: [
              { message: 'Todo cannot be created' },
            ],
          }, 400);
        }
        renderJsonResponse(res, todo, 200);
      });
    });
  }

  static async delete(req, res) {
    const parsedUrl = url.parse(req.url);
    const id = parsedUrl.path.substring(todoPath.length, parsedUrl.path.length);
    console.log('id', id);
    const todo = await TodoRepo.deteleById(id);
    if (todo === null) {
      renderJsonResponse(res, {
        success: false,
        errors: [
          { message: 'No Todo is deleted' },
        ],
      }, 400);
    }
    renderJsonResponse(res, todo, 200);
  }
}

export default TodoController;
