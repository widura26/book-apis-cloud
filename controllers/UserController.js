import firestore from '../samples/firestoreClient.js';

class UserController {

    signup = async () => {
        const usersCollection = firestore.collection('users');
        const users = await usersCollection.doc()
    }

    // login = async () => {
        
    // }
}