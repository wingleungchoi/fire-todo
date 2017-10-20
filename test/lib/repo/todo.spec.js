/* global describe it:true */
import chai from 'chai';
import moment from 'moment';

import TodoRepo from '../../../lib/repo/todo';

const { expect } = chai;

describe('Todo', () => {
  describe('#findById(id)', () => {
    // it('return null when id is not found', () => {
    //   const id = 'no this id';
    //   const todo = TodoRepo.findById(id);
    //   expect(todo).to.equal(null);
    // });
    it('return object of all data in the record', () => {
      const id = '49aecf71-6ca3-4c52-be72-bf51b84e8d76';
      const todo = TodoRepo.findById(id);
      expect(todo).to.equal(null);
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
