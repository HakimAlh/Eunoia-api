const express = require('express');

const Book = require('../models/book.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const book = await Book.create(req.body);
      book._doc.author = req.user;
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

router.get('/', async (req,res) => {
    try {
    const books = await Book.find({})
    res.status(200).json(books)
    } catch (error) {
    res.status(400).json({ error: `failed to load book ${error}` });    
    }
})

router.get('/:id', async (req,res) => {
    try {
    const books = await Book.findById(req.params.id)

    if(!books) throw new Error ('Book not found')
    res.status(200).json(books)
    } catch (error) {
    res.status(404).json({ error: `failed to get book ${error}` });    
    }
})


router.delete('/:id', async (req,res) => {
    try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) throw new Error('Book not Found')
    res.status(200).json({success: true})
    } catch (error) {
    res.status(400).json({ error: `Unable to delete: ${error}` });    
    }
})


router.put('/:id', async (req,res) => {
    try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!book) throw new Error('Book not Found')
    res.status(200).json(book)
    } catch (error) {
    res.status(422).json({ error: `Unable to update: ${error}` });    
    }
})

module.exports = router;