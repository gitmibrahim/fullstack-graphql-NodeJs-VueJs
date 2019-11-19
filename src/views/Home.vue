<template>
  <div id="home">
    <div class="col">
      <label for="new-user">Add a Reader:</label>
      <div class="flex">
        <input type="text" v-model="readerName" placeholder="Reader Name..." @keypress.enter="addUser">
        <button @click="addUser">Create</button>
      </div>
      <Table v-if="readers.length" :list="readers" name="readers" />
    </div>
    <div class="col">
      <label for="new-book">Add a Book:</label>
      <div class="flex">
        <input id="new-book" type="text" v-model="bookName" placeholder="Book Name..." @keypress.enter="addBook">
        <button @click="addBook">Create</button>
      </div>
      <Table v-if="books.length" :list="books" name="books" />
    </div>
    <div class="col">
      <label for="new-author">Add an Author:</label>
      <div class="flex">
        <input id="new-author" type="text" v-model="authorName" placeholder="Author Name..." @keypress.enter="addAuthor">
        <button @click="addAuthor">Create</button>
      </div>
      <Table v-if="authors.length" :list="authors" name="authors" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '../components/Table.vue';
import axios from 'axios';

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
  methods: {
    async addUser() {
      const res = await axios.post('http://localhost:4200/graphql', {
        query: `
          mutation {
            createReader(input: {
              firstName: "${this.readerName}"
            }) {
              id
              firstName
              books {
                id
              }
            }
          }
        `
      })
      this.readers.push(res.data.data.createReader)
      this.readerName = ''
    },
    async addBook() {
      const res = await axios.post('http://localhost:4200/graphql', {
        query: `
          mutation {
            createBook(input: {
              name: "${this.bookName}"
            }) {
              id
              name
              authors {
                id
                firstName
              }
            }
          }
        `
      })
      this.books.push(res.data.data.createBook)
      this.bookName = ''
    },
    async addAuthor() {
      const res = await axios.post('http://localhost:4200/graphql', {
        query: `
          mutation {
            createAuthor(input: {
              firstName: "${this.authorName}"
            }) {
              id
              firstName
            }
          }
        `
      })
      this.authors.push(res.data.data.createAuthor)
      this.authorName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .col {
    width: 30%;
    margin-bottom: 50px;
  }
  input, td, th {
    color: #28313E;
    padding: 5px;
    border: 2px solid #F9FFEE;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  input {
    font-size: 1.02rem;
  }

  .flex {
    display: flex;

    button {
      background: #EFBB35;
      color: #28313E;
      padding: 5px;
      border: 2px solid #F9FFEE;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
</style>