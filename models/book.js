const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
})

const bookSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false,
    enum: ['Guide', 'Novel', 'Fiction', 'Non-Fiction', 'General', 'History'],
},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chapters: [chapterSchema],
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


