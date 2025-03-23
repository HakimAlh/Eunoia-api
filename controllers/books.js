// controllers/hoots.js

const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Book = require("../models/book.js");

const router = express.Router();

// ========== Public Routes ===========


router.get("/", async (req, res) => {
  try {
    const hoots = await Book.find({})
    .populate("author")
			.sort({ createdAt: "desc" });
		res.status(200).json(hoots);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate([
			"author",
			"chapters.author",
		]);
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
});

// ========= Protected Routes =========
router.use(verifyToken);

router.post("/", async (req, res) => {
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

router.put("/:bookId", async (req, res) => {
	try {
		const book = await Book.findById(req.params.bookId);
		if (!book.author.equals(req.user._id)) {
			return res.status(403).send("You're not allowed to do that!");
		}

		const updatedBook = await Book.findByIdAndUpdate(
			req.params.bookId,
			req.body,
			{ new: true }
		);
		updatedBook._doc.author = req.user;
		res.status(200).json(updatedBook);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete("/:bookId", async (req, res) => {
	try {
		const book = await Book.findById(req.params.bookId);

		if (!book.author.equals(req.user._id)) {
			return res.status(403).send("You're not allowed to do that!");
		}

		const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
		res.status(200).json(deletedBook);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.post("/:bookId/chapters", async (req, res) => {
	try {
		req.body.author = req.user._id;
		const book = await Book.findById(req.params.bookId);
		book.chapters.push(req.body);
		await book.save();
		const newChapter = book.chapters[book.chapters.length - 1];
		newChapter._doc.author = req.user;
		res.status(201).json(newChapter);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put("/:bookId/chapters/:chapterId", async (req, res) => {
	try {
		const book = await Book.findById(req.params.bookId);
		const chapter = book.chapters.id(req.params.chapterId);
		chapter.text = req.body.text;
		await book.save();
		res.status(200).json({ message: "Ok" });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:bookId/chapters/:chapterId", async (req, res) => {
	try {
		const book = await Book.findById(req.params.bookId);
		book.chapters.remove({ _id: req.params.chapterId });
		await book.save();
		res.status(200).json({ message: "Ok" });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
