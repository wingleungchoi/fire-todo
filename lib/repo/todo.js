import uuidv4 from 'uuid/v4';
import moment from 'moment';
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: 'https://fire-todo-1bada.firebaseio.com',
});


// Get a database reference to our blog
const db = admin.database();
const ref = db.ref('server/saving-data/todo-app');

const todoRefs = ref.child('todos');

class Todo {
  static async findById(id) {
    // https://github.com/firebase/firebase-admin-node/blob/33d3216feda3e468bec7b044dee6ce6d4eed67c6/test/integration/database.js#L39
    // once already is a promise
    const snapshot = await todoRefs.child(id).once('value');
    const recordWithoutId = snapshot.val();
    console.log('recordWithoutId', recordWithoutId);
    return recordWithoutId
      ? {
        id,
        ...recordWithoutId,
      }
      : null;
  }

  static async insert(obj) {
    const id = uuidv4();
    const createdAt = moment().valueOf();
    const updatedAt = createdAt;
    const { name, deadline, userId } = obj;
    // reference: https://github.com/firebase/firebase-admin-node/blob/33d3216feda3e468bec7b044dee6ce6d4eed67c6/test/integration/database.js#L26
    // set() => {} fails, will raise error otherwise return undefined
    const record = {
      name,
      deadline,
      userId,
      createdAt,
      updatedAt,
    };
    try {
      await todoRefs.child(id).set(record);
      return {
        id,
        ...record,
      };
    } catch (e) {
      console.error('Fail in saving firebase', e);
      return Promise.resolve(null);
    }
  }

  static async update(obj) {
    const updatedAt = moment().valueOf();
    const {
      id,
      name,
      deadline,
      userId,
    } = obj;
    // reference: https://github.com/firebase/firebase-admin-node/blob/33d3216feda3e468bec7b044dee6ce6d4eed67c6/test/integration/database.js#L26
    // set() => {} fails, will raise error otherwise return undefined
    const record = {
      name,
      deadline,
      userId,
      updatedAt,
    };
    try {
      await todoRefs.child(id).update(record);
      return {
        id,
        ...record,
      };
    } catch (e) {
      console.error('Fail in update firebase', e);
      return Promise.resolve(null);
    }
  }

  static async deteleById(id) {
    try {
      const record = await Todo.findById(id);
      if (record === null) {
        throw new Error('Record does not exist');
      }
      await todoRefs.child(id).remove();
      return { id };
    } catch (e) {
      console.error('Fail in update firebase', e);
      return Promise.resolve(null);
    }
  }
}

export default Todo;
