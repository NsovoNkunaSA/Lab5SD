//my constants
const express = require("express");

const server = express();

const SERVER_PORT = 3000;

server.use(express.json());

let library = [];

server.get("/whoami", (req, res) => {
    res.json({ studentID: "2555047" });
});

server.get("/books", (req, res) => {
    res.json(library);
});

server.get("/books/:bookId", (req, res) => {
    const selectedBook = library.find(item => item.id === req.params.bookId);
    if (!selectedBook) {
        return res.status(404).json({ error: "Book was not found" });
    }
    res.json(selectedBook);
});

server.post("/books", (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !Array.isArray(details)) {
        return res.status(400).json({ error: "Invalid details or missing book information" });
    }

    library.push({ id, title, details });
    res.status(201).json({ message: "New book was added successfully" });
});

server.put("/books/:bookId", (req, res) => {
    const selectedBook = library.find(item => item.id === req.params.bookId);
    if (!selectedBook) {
        return res.status(404).json({ error: "Book was not found" });
    }

    const { title, details } = req.body;
    if (title) selectedBook.title = title;
    if (details) selectedBook.details = details;

    res.json({ message: "Book was information updated" });
});


server.delete("/books/:bookId", (req, res) => {
    library = library.filter(item => item.id !== req.params.bookId);
    res.json({ message: "Book was successfully deleted" });
});


server.post("/books/:bookId/details", (req, res) => {
    const selectedBook = library.find(item => item.id === req.params.bookId);
    if (!selectedBook) {
        return res.status(404).json({ error: "Book was not found" });
    }

    const { id, author, genre, yearPublished } = req.body;
    if (!id || !author || !genre || !yearPublished) {
        return res.status(400).json({ error: "Missing details" });
    }

    selectedBook.details.push({ id, author, genre, yearPublished });
    res.json({ message: "Book were details added" });
});


server.delete("/books/:bookId/details/:detailId", (req, res) => {
    const selectedBook = library.find(item => item.id === req.params.bookId);
    if (!selectedBook) {
        return res.status(404).json({ error: "Book was not found" });
    }

    selectedBook.details = selectedBook.details.filter(detail => detail.id !== req.params.detailId);
    res.json({ message: "Book details were removed" });
});


server.listen(SERVER_PORT, () => {
    console.log(`My server is live on port ${SERVER_PORT}`);
});
