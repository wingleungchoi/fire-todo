import uuidv4 from 'uuid/v4';
import moment from 'moment';
import admin from 'firebase-admin';
import serviceAccount from '../../firebase-secret.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fire-todo-1bada.firebaseio.com',
});


// Get a database reference to our blog
const db = admin.database();
const ref = db.ref('server/saving-data/todo-app');

const todoRefs = ref.child('todos');

class Todo {
  static async findById(id) {
    const res = await todoRefs.child(id).once('value', (snapshot) => {
      console.log('snapshot', snapshot);
      console.log('snapshot.val()', snapshot.val());
    }, (errorObject) => {
      console.error(`The read failed:  ${errorObject.code}`);
    });
    return res;
  }

  static async insert(obj) {
    const id = uuidv4();
    const createdAt = moment().valueOf();
    const updatedAt = createdAt;
    const { name, deadline } = obj;
    // reference: https://github.com/firebase/firebase-admin-node/blob/33d3216feda3e468bec7b044dee6ce6d4eed67c6/test/integration/database.js#L26
    // set() => {} fails, will raise error otherwise return undefined
    const record = {
      name,
      deadline,
      createdAt,
      updatedAt,
    };
    try {
      await todoRefs.child(id).set(record);
      return {
        ...record,
        id,
      };
    } catch (e) {
      console.error('Fail in saving firebase');
      return Promise.revolve(null);
    }
  }
}

export default Todo;
