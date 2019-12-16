<template src="./Home.html">
  
</template>

<script>
// @ is an alias to /src
import Table from '../components/Table.vue';
import axios from 'axios';
import * as graphql from '../services/grqphql.service.js';

export default {
  name: 'home',
  components: {
    Table
  },
  data() {
    return {
      readerName: '',
      bookName: '',
      authorName: '',
      readers: [],
      books: [],
      authors: [],
    }
  },
  async mounted() {
    const operationType = `query`;

    let operationName = `getReaders`;
    let fieldsToGet = `{id, firstName, books {id, name, authors {id, firstName}}}`;
    const readers = await this.gQueriesWithoutPayload({operationType, operationName, fieldsToGet});
    this.readers = readers.data.data.getReaders;

    operationName = `getBooks`;
    fieldsToGet = `{id, name, authors {id, firstName}}`;
    const books = await this.gQueriesWithoutPayload({operationType, operationName, fieldsToGet});
    this.books = books.data.data.getBooks;

    operationName = `getAuthors`;
    fieldsToGet = `{id, firstName}`;
    const authors = await this.gQueriesWithoutPayload({operationType, operationName, fieldsToGet});
    this.authors = authors.data.data.getAuthors;
  },
  methods: {
    async addUser() {
      const operationType = `mutation`;
      const operationName = `createReader`;
      const payload = `{firstName: "${this.readerName}"}`;
      const fieldsToGet = `{id, firstName, books {id}}`;
      
      const res = await graphql.gQuery({operationType, operationName, payload, fieldsToGet});
      this.readers.push(res.data.data.createReader);
      this.readerName = '';
    },
    async addBook() {
      const operationType = `mutation`;
      const operationName = `createBook`;
      const payload = `{name: "${this.bookName}"}`;
      const fieldsToGet = `{id, name, authors {id, firstName}}`;
      
      const res = await graphql.gQuery({operationType, operationName, payload, fieldsToGet});
      this.books.push(res.data.data.createBook);
      this.bookName = '';
    },
    async addAuthor() {
      const operationType = `mutation`;
      const operationName = `createAuthor`;
      const payload = `{firstName: "${this.authorName}"}`;
      const fieldsToGet = `{id, firstName}`;
      
      const res = await graphql.gQuery({operationType, operationName, payload, fieldsToGet});
      this.authors.push(res.data.data.createAuthor)
      this.authorName = ''
    },

    gQueriesWithoutPayload({operationType, operationName, fieldsToGet}) {
      return graphql.gQueryWithoutPayload({operationType, operationName, fieldsToGet});
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss"></style>