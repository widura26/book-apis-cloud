import express from 'express';
import BookController from '../controllers/BookController.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});
router.get('/allbooks', new BookController().getBooks);
// router.get('/book/:id', new BookController());
router.post('/books', upload.single('file'), new BookController().createBook);
// 'file' yang terdapat di dalam function single itu nama fieldnya
router.delete('/books/:id', new BookController().deleteBook);
export default router;