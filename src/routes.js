const handler = require("./handlers");

module.exports = [
    {
        method: "POST",
        path: "/books",
        handler: handler.createBook
    },
    {
        method: "GET",
        path: "/books",
        handler: handler.getAllBook
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: handler.getOneBook
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: handler.updateBook
    },
    {
        method: "DELETE",
        path: "/books/{id}",
        handler: handler.deleteBook
    }
];