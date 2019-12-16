import { buildSchema } from 'graphql';
import resolvers from "./resolvers";

const schema = buildSchema(`
    type Reader {
        id: String
        firstName: String
        books: [Book]
    }
    type Book {
        id: String
        name: String
        authors: [Author]
    }
    type Author {
        id: String
        firstName: String
    }
    

    input ReaderInput {
        firstName: String!
    }
    input BookInput {
        name: String!
    }
    input AuthorInput {
        firstName: String!
    }

    input AttachBookToReaderInput {
        bookId: String!
        readerId: String!
    }
    input AttachAuthorToBookInput {
        authorId: String!
        bookId: String!
    }
    input UpdateAuthorNameInput {
        id: String!
        firstName: String!
    }
    input UpdateBookNameInput {
        id: String!
        name: String!
    }
    input UpdateReaderNameInput {
        id: String!
        firstName: String!
    }

    
    type Query {
        getReaders: [Reader]
        getReader(id: String): Reader

        getBooks: [Book]
        getBook(id: String): Book

        getAuthors: [Author]
        getAuthor(id: String): Author
    }
    

    type Mutation {
        attachAuthorToBook(input: AttachAuthorToBookInput): Author
        attachBookToReader(input: AttachBookToReaderInput): Book

        createAuthor(input: AuthorInput): Author
        createBook(input: BookInput): Book
        createReader(input: ReaderInput): Reader

        deleteAuthor(id: String): [Author]
        deleteBook(id: String): [Book]
        deleteReader(id: String): [Reader]

        detachAuthorFromBook(input: AttachAuthorToBookInput): Book
        detachBookFromReader(input: AttachBookToReaderInput): Reader

        updateAuthorName(input: UpdateAuthorNameInput): Author
        updateBookName(input: UpdateBookNameInput): Book
        updateReaderName(input: UpdateReaderNameInput): Reader
    }
`);

// const schema = buildSchema(`
//     ${types}
//     ${inputs}
//     ${queries}
//     ${mutations}
// `)

export default schema;
