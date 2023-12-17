import firestore from '../samples/firestoreClient.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
class UserController {

    signin = async (req, res) => {
        const { username, email, password } = req.body;
        const id = crypto.randomBytes(14).toString('hex');
        
        try {
            const usersCollection = firestore.collection('users').doc(`${id}`);
            const addUser = await usersCollection.create({
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 8),
            })

            res.send({
                message: 'Sign up successfully'
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