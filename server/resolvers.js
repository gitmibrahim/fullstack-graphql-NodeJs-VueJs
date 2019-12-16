import Reader from './Models/Reader.model.js';
import Author from './Models/Author.model.js';
import Book from './Models/Book.model.js';
const crypto = require('crypto');

const readerDatabase = {};
const bookDatabase = {};
const authorDatabase = {};

const resolvers = { 
  getReaders: () => Object.values(readerDatabase),
  getReader: ({ id }) => readerDatabase[id],
  createReader: ({ input }) => {
    let id = crypto.randomBytes(2).toString('hex');
    input.id = id;
    input.books = [];
    readerDatabase[id] = new Reader(input);
    return readerDatabase[id];
  },
  deleteReader: ({ id }) => {
    delete readerDatabase[id];
    return getReaders();
  },
  updateReaderName: ({ input }) => {
    readerDatabase[input.id].firstName = input.firstName;
    return readerDatabase[input.id];
  },

  getBooks: () => Object.values(bookDatabase),
  getBook: ({ id }) => bookDatabase[id],
  createBook: ({ input }) => {
    let id = crypto.randomBytes(2).toString('hex');
    input.id = id;
    input.authors = [];
    bookDatabase[id] = new Book(input);
    return bookDatabase[id];
  },
  deleteBook: ({ id }) => {
    delete bookDatabase[id];
    return getBooks();
  },
  updateBookName: ({ input }) => {
    bookDatabase[input.id].name = input.name;
    return bookDatabase[input.id];
  },

  getAuthors: () => Object.values(authorDatabase),
  getAuthor: ({ id }) => authorDatabase[id],
  createAuthor: ({ input }) => {
    let id = crypto.randomBytes(2).toString('hex');
    input.id = id;
    authorDatabase[id] = new Author(input);
    return authorDatabase[id];
  },
  deleteAuthor: ({ id }) => {
    delete authorDatabase[id];
    return getAuthors();
  },
  updateAuthorName: ({ input }) => {
    authorDatabase[input.id].firstName = input.firstName;
    return authorDatabase[input.id];
  },

  attachBookToReader: ({ input }) => {
    readerDatabase[input.readerId].books.push(bookDatabase[input.bookId]);
    return bookDatabase[input.bookId];
  },
  detachBookFromReader: ({ input }) => {
    readerDatabase[input.readerId].books.splice(input.bookId, 1);
    return readerDatabase[input.readerId];
  },
  attachAuthorToBook: ({ input }) => {
    bookDatabase[input.bookId].authors.push(authorDatabase[input.authorId]);
    return authorDatabase[input.authorId];
  },
  detachAuthorFromBook: ({ input }) => {
    bookDatabase[input.bookId].authors.splice(input.authorId, 1);
    return bookDatabase[input.bookId];
  },
};

export default resolvers;