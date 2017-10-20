/* global describe it:true */
import chai from 'chai';
import moment from 'moment';

import TodoRepo from '../../../lib/repo/todo';

const { expect } = chai;

describe('Todo', () => {
  describe('#findById(id)', () => {
    it('return null when id is not found', async () => {
      const id = 'no this id';
      const todo = await TodoRepo.findById(id);
      expect(todo).to.equal(null);
    });

    it('return object of all data in the record', async () => {
      const id = '96f1e8e7-37e1-4386-b680-a4eb9365f4a4';
      const todo = await TodoRepo.findById(id);
      const expectedResult = {
        id,
        createdAt: 1508490517512,
        deadline: 1508490517510,
        name: 'todo 1 in test',
        updatedAt: 1508490517512,
      };
      expect(`${todo}`).to.equal(`${expectedResult}`);
    });
  });

  describe('#insert(obj)', () => {
    it('shall persists data', async () => {
      const deadline = moment().valueOf();
      const todo = {
        userId: '123',
        name: 'todo 1 in test',
        deadline,
      };
      const presistedTodo = await TodoRepo.insert(todo);
      expect(presistedTodo.id).to.be.a('string');
      const todoFromDB = await TodoRepo.findById(presistedTodo.id);
      expect(todoFromDB.userId).to.equal(todo.userId);
      expect(todoFromDB.name).to.equal(todo.name);
    });
  });
});
