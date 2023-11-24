import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title must be filled']
    },
    author: {
        type: String,
        required: [true, 'author must be filled too']
    }
})

export default mongoose.model('Book', bookSchema);