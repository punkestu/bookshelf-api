class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "Not Found";
    }
}

module.exports = {
    books: [],
    NotFound
};