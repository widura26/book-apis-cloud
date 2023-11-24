import express from 'express';
import BookController from '../controllers/BookController.js';
const router = express.Router();

router.get('/allbooks', new BookController().getBooks);
router.post('/books', new BookController().createBook);

export default router;