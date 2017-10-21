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
    it('shall persists data when succeed', async () => {
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
      // clean up remote DB
      await TodoRepo.deteleById(presistedTodo.id);
    });

    it('shall return null when fails', async () => {
      const deadline = moment().valueOf();
      const todo = {
        userId: () => {},
        name: 'todo 1 in test',
        deadline,
      };
      const presistedTodo = await TodoRepo.insert(todo);
      expect(presistedTodo).to.equal(null);
    });
  });

  describe('#update(obj)', () => {
    it('shall update data', async () => {
      const deadline = moment().valueOf();
      const todo = {
        id: 'af8a6d5b-f6f7-430d-a611-983bc0b702bf',
        userId: '123',
        name: 'todo 1 in test',
        deadline,
      };
      const presistedTodo = await TodoRepo.update(todo);
      expect(presistedTodo.id).to.be.a('string');
      const todoFromDB = await TodoRepo.findById(presistedTodo.id);
      expect(todoFromDB.userId).to.equal(todo.userId);
      expect(todoFromDB.deadline).to.equal(todo.deadline);
    });

    it('shall return null when fails', async () => {
      const deadline = moment().valueOf();
      const todo = {
        userId: () => {},
        name: 'todo 1 in test',
        deadline,
      };
      const presistedTodo = await TodoRepo.update(todo);
      expect(presistedTodo).to.equal(null);
    });
  });

  describe('#deteleById(obj)', () => {
    it('shall detele data when succeed', async () => {
      const deadline = moment().valueOf();
      const todo = {
        userId: '123',
        name: 'todo 1 in test',
        deadline,
      };
      const presistedTodo = await TodoRepo.insert(todo);
      expect(presistedTodo.id).to.be.a('string');
      const deletedTodo = await TodoRepo.deteleById(presistedTodo.id);
      expect(deletedTodo.id).to.be.a('string');
      const todoFromDB = await TodoRepo.findById(presistedTodo.id);
      expect(todoFromDB).to.equal(null);
    });

    it('shall return null when id does not exist', async () => {
      const presistedTodo = await TodoRepo.deteleById('Id cannot be deleted');
      expect(presistedTodo).to.equal(null);
    });

    it('shall return null when fails', async () => {
      const presistedTodo = await TodoRepo.deteleById(() => {});
      expect(presistedTodo).to.equal(null);
    });
  });

  describe('#where(val, key)', () => {
    it('returns a list of related todos when some todo meet the target', async () => {
      const todos = await TodoRepo.where('123', 'userId');
      expect(todos.length).to.be.above(0);
    });
    it('returns empty list when NO todo meet the target', async () => {
      const todos = await TodoRepo.where('no this useId', 'userId');
      expect(todos.length).to.equal(0);
    });
  });
});
