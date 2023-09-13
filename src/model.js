const nanoId = require("nanoid");
const {books, NotFound} = require("./data");

function save({id, name, year, author, summary, publisher, pageCount, readPage, reading}) {
    if (!id) {
        id = nanoId.nanoid(16);
        const finished = pageCount === readPage;
        const insertedAt = new Date().toISOString();
        books.push({
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            insertedAt,
            updatedAt: insertedAt
        });
    } else {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return new NotFound("book not found");
        }
        const finished = pageCount === readPage;
        const updatedAt = new Date().toISOString();
        books[bookIndex] = {
            ...books[bookIndex],
            name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt
        };
    }
    return id;
}

function load({id, name, reading, finished}) {
    return books.filter((book) => {
        let result = true;
        if (id) {
            result = result && book.id === id;
        }
        if (name) {
            result = result && book.name.toLowerCase().includes(name.toLowerCase());
        }
        if (reading) {
            result = result && book.reading === (reading === "1");
        }
        if (finished) {
            result = result && book.finished === (finished === "1");
        }
        return result;
    });
}

function remove(id) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return new NotFound("book not found");
    }
    books.splice(bookIndex, 1);
    return id;
}

module.exports = {
    service: {
        save, load, remove
    }
};