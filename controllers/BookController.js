import Book from '../models/Book.js'
import crypto from 'crypto';
import firestore from '../samples/firestoreClient.js';

class BookController {
    getBooks = async (req, res) => {
        const books = firestore.collection(`books`);
        const AllBooks = await books.get();
        let bookList = [];
        AllBooks.forEach(book => bookList.push(book.data()));
        res.status(200).json({
            data: bookList
        })
    }
    
    createBook = async (req, res) => {
        const { title, author } = req.body;
        const id = crypto.randomBytes(14).toString('hex')
        try {
            const book = firestore.doc(`/books/${id}`);
            const addBook = await book.set({
                title: title,
                author: author
            })
            res.status(200).json({
                message: 'Data berhasil ditambahkan',
                data: addBook
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: error.message
            })
        }
    }
}

export default BookController;