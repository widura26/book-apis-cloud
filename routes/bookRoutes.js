import express from 'express';
import BookController from '../controllers/BookController.js';
import multer from 'multer';
const router = express.Router();
const upload = multer();
router.get('/allbooks', new BookController().getBooks);
// router.get('/book/:id', new BookController());
router.post('/books', upload.single('file'), new BookController().createBook);

export default router;