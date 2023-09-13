const {NotFound} = require("./data");
const {service: books} = require("./model");

function BookSaveValidation(book, h, message) {
    if (!book.name) {
        return h.response({
            "status": "fail",
            "message": `${message}. Mohon isi nama buku`
        }).code(400);
    }
    if (book.readPage > book.pageCount) {
        return h.response({
            "status": "fail",
            "message": `${message}. readPage tidak boleh lebih besar dari pageCount`
        }).code(400);
    }

    return null;
}

function createBook(req, h) {
    const book = {id: null, ...req.payload};

    const validator = BookSaveValidation(book, h, "Gagal menambahkan buku");
    if (validator) return validator;

    const res = books.save(book);
    return h.response({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": res
        }
    }).code(201);
}

function getAllBook(req, h) {
    const loadedBooks = books.load(req.query)
        .map(({id, name, publisher}) => {
            return {id, name, publisher}
        });
    return h.response({
            "status": "success",
            "data": {
                "books": loadedBooks
            }
        }
    ).code(200);
}

function getOneBook(req, h) {
    const {id} = req.params
    const loadedBooks = books.load({id})
    if (loadedBooks.length === 0) {
        return h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }).code(404);
    }
    return h.response({
        "status": "success",
        "data": {
            "book": loadedBooks[0]
        }
    }).code(200);
}

function updateBook(req, h) {
    const {id} = req.params;
    const book = {id, ...req.payload};

    const validator = BookSaveValidation(book, h, "Gagal memperbarui buku");
    if (validator) return validator;

    const res = books.save(book);
    if (res instanceof NotFound) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404);
    }
    return h.response({
        "status": "success",
        "message": "Buku berhasil diperbarui"
    }).code(200);
}

function deleteBook(req, h) {
    const {id} = req.params;
    const bookId = books.remove(id);
    if (bookId instanceof NotFound) {
        return h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404);
    }
    return h.response({
        "status": "success",
        "message": "Buku berhasil dihapus"
    }).code(200);
}

module.exports = {
    createBook, getAllBook, getOneBook, updateBook, deleteBook
}