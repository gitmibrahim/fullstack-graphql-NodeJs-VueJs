<template>
  <div id="table">
    <table>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td v-for="(item, index) in list" :key="index">
            <span
              :draggable="name === 'books' || name === 'authors'"
              @dragstart="dragStart($event, item)"
              @dragend="dragEnd"
              :id="index + name"
            >
              {{item.name || item.firstName}}
            </span>
          </td>
        </tr>

        <tr v-if="name === 'readers' || name === 'books'">
          <th scope="row" v-if="name === 'readers'">Books</th>
          <th scope="row" v-if="name === 'books'">Authors</th>
          <td
            v-for="(item, index) in list" :key="index"
            class="target"
            @drop="drop($event, item)"
            @dragover="allowDrop"
          >
          <span class="droppable">Drop {{ name == 'books' ? 'an Author' : 'a Book' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index.ts';

export default {
  props: ['list', 'name'],
  store,
  data() {
    return {
      from: '',
      to: '',
      readerId: '',
      bookId: '',
      authorId: '',
    }
  },
  methods: {
    dragStart(event, item) {
      event.currentTarget.style.backgroundColor = '#EFBB35';
      event.currentTarget.style.color = '#28313E';

      event.dataTransfer.setData('text/plain', event.target.id);
      event.dataTransfer.effectAllowed = "move";
      
      this.from = this.name;
      if (this.name === 'books') this.$store.dispatch('setBookId', item.id);
      if (this.name === 'authors') this.$store.dispatch('setAuthorId', item.id);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    drop(event, item) {
      const id = event.dataTransfer.getData('text/plain');
      const draggableElement = document.getElementById(id);
      var nodeCopy = document.getElementById(id).cloneNode(true);
      nodeCopy.id = 'copy' + id;

      nodeCopy.style.backgroundColor = 'transparent';
      nodeCopy.style.color = '#F59BAC';
  
      const dropzone = event.path[1];  
      dropzone.appendChild(nodeCopy);
      event.dataTransfer.clearData();

      this.to = this.name;
      if (this.name === 'readers') this.$store.dispatch('setReaderId', item.id);
      if (this.name === 'books') this.$store.dispatch('setBookId', item.id);
      if (this.to === 'books') this.attachAuthorToBook(item);
      else this.attachBookToReader(item);
    },
    dragEnd(event) {
      event.currentTarget.style.backgroundColor = 'transparent';
      event.currentTarget.style.color = '#F59BAC';
    },

    async attachBookToReader(item) {
      const res = await axios.post('http://localhost:4200/graphql', {
        query: `
          mutation {
            attachBookToReader(input: {
              bookId: "${this.$store.getters.bookId}"
              readerId: "${this.$store.getters.readerId}"
            }) {
              id
              firstName
              books {
                id
                name
              }
            }
          }
        `
      })
      item.books = res.data.data.books
    },

    async attachAuthorToBook(item) {
      const res = await axios.post('http://localhost:4200/graphql', {
        query: `
          mutation {
            attachAuthorToBook(input: {
              authorId: "${this.$store.getters.authorId}"
              bookId: "${this.$store.getters.bookId}"
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
      item.author = res.data.data.author
    }
  }
}
</script>

<style lang="scss" scoped>
  table {
    margin: 10px 0;
  }

  table tr:first-child th {
    border-top-left-radius: 10px;
  }
  table tr:last-child th {
    border-bottom-left-radius: 10px;
  }

  table tr:first-child td:last-child {
    border-top-right-radius: 10px;
  }
  table tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }

  th {
    background-color: #4CAF50;
    color: white;
  }

  th, td {
    border: 2px solid #F9FFEE;
    padding: 15px;
  }

  td.Droppable {
    background-color: #EEE;
  }

  [draggable] {
    cursor: move;
  }

  .droppable {
    color: #999;
    border: 1px dashed #fff;
    height: 41px;
    display: block;
    font-size: .8rem;
    margin: 10px 0;
  }
</style>