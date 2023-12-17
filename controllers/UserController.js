import firestore from '../samples/firestoreClient.js';
import crypto from 'crypto';
class UserController {

    signin = async (req, res) => {
        const { username, email, password } = req.body;
        const id = crypto.randomBytes(14).toString('hex');
        
        try {
            const usersCollection = firestore.collection('users').doc(`${id}`);
            const addUser = await usersCollection.set({
                username: username,
                email: email,
                password: password,
            })

            res.status(200).json({
                message: 'signin successfully',
                data: addUser
            })
        } catch (error) {
            console.log(error);
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;
    }
}

export default UserController;