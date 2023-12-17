import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

router.post('/signin', new UserController().signup);
router.post('/login', new UserController().login);
export default router;