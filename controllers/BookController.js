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

    uploadFile = async (fileBuffer, destFileName) => {
        const bucketName = 'book-apis-bucket'
        const storage = new Storage({
            keyFilename: 'samples/storage.json'
        })

        try {
            const file = storage.bucket(bucketName).file(destFileName);
            new Promise((resolve, reject) => {
                file.createWriteStream().on('error', (err) => {
                    console.error(`Error uploading file: ${err}`);
                    reject(err);
                }).on('finish', () => {
                    console.log('File uploaded successfully');
                    resolve(destFileName);
                })
                .end(fileBuffer);
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteFile = async (fileName) => {
        const bucketName = 'book-apis-bucket';
        const storage = new Storage({
            keyFilename: "samples/keyfile.json"
        });
        try {
            await storage.bucket(bucketName).file(fileName).delete();
            console.log('Delete file successfully');
        } catch (error) {
            console.log(error);
        }
    }
    
    createBook = async (req, res) => {
        const { title, author } = req.body;
        const uploadFile = req.file;
        const fileBuffer = uploadFile.buffer;
        const destFileName = uploadFile.originalname;
        const id = crypto.randomBytes(14).toString('hex');

        try {
            await this.uploadFile(fileBuffer, destFileName);
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

    getOneBook = async (req, res) => {
        try {
            const { id } = req.params;
            const book = await firestore.collection('books').doc(`${id}`).get()      
            res.send({
                data: book.data()
            })  
        } catch (error) {
            console.log(error)
            res.send({
                message: error
            })
        }
    }

    deleteBook = async (req, res) => {
        try {
            const { id } = req.params;
            const book = await firestore.doc(`/books/${id}`).get();
            const bookDelete = book.data()
            bookDelete.delete()
            res.send({
                message: book.data()
            })
        } catch (error) {
            res.send('sorry, something went wrong');
        }
    } 
}

export default BookController;