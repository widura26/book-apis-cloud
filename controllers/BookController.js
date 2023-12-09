import Book from '../models/Book.js'
import crypto from 'crypto';
import firestore from '../samples/firestoreClient.js';
import { Storage } from '@google-cloud/storage';
import path from 'path';
const keyFilePath = path.resolve(__dirname, '../samples/storage.json')

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
            keyFilename: keyFilePath
        })

        try {
            const file = storage.bucket(bucketName).file(destFileName);
            await new Promise((resolve, reject) => {
                file.createWriteStream().on('error', (err) => {
                    console.error(`Error uploading file: ${err}`);
                }).on('finish', () => {
                    console.log('File uploaded successfully');
                }).end();
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    createBook = async (req, res) => {
        const { title, author } = req.body;
        const file = req.file;

        const destFileName = file.originalname;
        await this.uploadFile(destFileName);

        const id = crypto.randomBytes(14).toString('hex')
        try {
            const book = firestore.doc(`/books/${id}`);
            const addBook = await book.set({
                title: title,
                author: author,
                file: `https://storage.googleapis.com/book-apis-bucket/${file.originalname}`
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