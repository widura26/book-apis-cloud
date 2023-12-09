import Book from '../models/Book.js'
import crypto from 'crypto';
import firestore from '../samples/firestoreClient.js';
import { Storage } from '@google-cloud/storage';

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

    uploadFile = async (destFileName) => {
        const bucketName = 'book-apis-bucket'
        const storage = new Storage({
            keyFilename: 'samples/storage.json'
        })

        try {
            const file = storage.bucket(bucketName).file(destFileName);
            return new Promise((resolve, reject) => {
                file.createWriteStream().on('error', (err) => {
                    console.error(`Error uploading file: ${err}`);
                    reject(err);
                }).on('finish', () => {
                    console.log('File uploaded successfully');
                    resolve();
                }).end();
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    createBook = async (req, res) => {
        const { title, author } = req.body;
        const uploadFile = req.file;
        const destFileName = uploadFile.originalname;

        await this.uploadFile(uploadFile.size);

        const id = crypto.randomBytes(14).toString('hex')
        try {
            const book = firestore.doc(`/books/${id}`);
            const addBook = await book.set({
                title: title,
                author: author,
                file: `https://storage.googleapis.com/book-apis-bucket/${uploadFile.originalname}`
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

    GetOneReport = async (req, res) => {
        const id = req.params.id;
    }
}

export default BookController;