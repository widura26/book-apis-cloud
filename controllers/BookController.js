import Book from '../models/Book.js'

class BookController {
    getBooks = async (req, res) => {
        const AllBooks = await Book.find();
        res.status(200).json({
            data: AllBooks
        })
    }
    createBook = async (req, res) => {
        const { title, author } = req.body;

        // if(!title && !author){
        //     return res.status(400).json({
        //         message: 'harus menyertakan data'
        //     })
        // }
        // if(!title){
        //     return res.status(400).json({
        //         message: "harus menyertakan title"
        //     })
        // }else if(!author){
        //     return res.status(400).json({
        //         message: "harus menyertakan author"
        //     })
        // }

        try {
            const book = new Book({
                title: title,
                author: author
            });

            const savedUser = await book.save();
            res.status(200).json({
                message: 'Data berhasil ditambahkan',
                data: savedUser
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