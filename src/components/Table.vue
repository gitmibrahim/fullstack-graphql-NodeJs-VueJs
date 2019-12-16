<template src="./table.component.html"></template>

<script>
import axios from 'axios';
import store from '../store/index.ts';
import * as graphql from '../services/grqphql.service.js';
import * as message from '../services/messages.service.js';

export default {
  props: ['list', 'name'],
  store,
  data() {
    return {
      readerId: '',
      bookId: '',
      authorId: '',
      input: '',
      editables: [],
      message: ''
    }
  },
  methods: {
    dragStart(event, item) {
      event.currentTarget.style.backgroundColor = '#EFBB35';
      event.currentTarget.style.color = '#28313E';

      event.dataTransfer.setData('text/plain', event.target.id);
      event.dataTransfer.effectAllowed = "move";
      
      this.$store.dispatch('setDragSrc', this.name);      
      if (this.name === 'books') this.$store.dispatch('setBookId', item.id);
      if (this.name === 'authors') this.$store.dispatch('setAuthorId', item.id);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    drop(event, item, index) {
      if ( 
        (this.name == 'books' && this.$store.getters.dragSrc !== 'authors') ||
        (this.name == 'readers' && this.$store.getters.dragSrc !== 'books')
      ) {
        this.message = `Make sure to attach ${this.name == 'books' ? 'an Author' : 'a Book'} to a ${this.capitalize(this.name.slice(0, -1))}`;
        setTimeout(() => {
          this.message = '';
        }, 3000);
        return;
      }

      const id = event.dataTransfer.getData('text/plain');
      var nodeCopy = document.getElementById(id).cloneNode(true);
      nodeCopy.id = 'copy' + id;

      nodeCopy.style.backgroundColor = 'transparent';
      nodeCopy.style.color = '#F59BAC';
  
      event.dataTransfer.clearData();

      if (this.name === 'readers') this.$store.dispatch('setReaderId', item.id);
      if (this.name === 'books') this.$store.dispatch('setBookId', item.id);

      if (this.name === 'books') this.attachAuthorToBook(index);
      else this.attachBookToReader(index);
    },
    dragEnd(event) {
      event.currentTarget.style.backgroundColor = 'transparent';
      event.currentTarget.style.color = '#F59BAC';
    },

    startEditing(index) {
      const name = document.getElementById(index + this.name);
      name.contentEditable = true;
      setTimeout(function() {
        name.focus();
      }, 0);
    },

    oninput() {
      this.input = event.srcElement.innerText.trim();
    },

    enter(e) {
      e.preventDefault();
      e.currentTarget.blur();
      e.currentTarget.contentEditable = false;
      this.updateName(+e.currentTarget.id[0]);
    },

    blur(item) {
      this.contentEditable = false;
      const name = item.name || item.firstName
      name.trim();
      return item;
    },

    async attachBookToReader(index) {
      const operationType = `mutation`;
      const operationName = `attachBookToReader`;
      const payload = `{bookId: "${this.$store.getters.bookId}", readerId: "${this.$store.getters.readerId}"}`;
      const fieldsToGet = `{id, name, authors{id, firstName}}`;

      const res = await graphql.gQuery({operationName, operationType, payload, fieldsToGet});
      this.list[index].books.push(res.data.data.attachBookToReader);
    },

    async attachAuthorToBook(index) {
      const operationType = `mutation`;
      const operationName = `attachAuthorToBook`;
      const payload = `{authorId: "${this.$store.getters.authorId}", bookId: "${this.$store.getters.bookId}"}`;
      const fieldsToGet = `{id, firstName}`;
      
      const res = await graphql.gQuery({operationName, operationType, payload, fieldsToGet});
      this.list[index].authors.push(res.data.data.attachAuthorToBook);
    },

    async updateName(index) {
      const el = this.list[index]
      if (this.name == 'books') {
        const operationType = `mutation`;
        const operationName = `updateBookName`;
        const payload = `{id: "${el.id}", name: "${this.input}"}`;
        const fieldsToGet = `{name, authors {firstName}}`;

        const res = await graphql.gQuery({operationName, operationType, payload, fieldsToGet});
        this.list[index].name = res.data.data.updateBookName.name;
      }
      else if (this.name == 'readers') {
        const operationType = `mutation`;
        const operationName = `updateReaderName`;
        const payload = `{id: "${el.id}", firstName: "${this.input}"}`;
        const fieldsToGet = `{firstName books {name, authors {firstName}}}`;
        
        const res = await graphql.gQuery({operationName, operationType, payload, fieldsToGet});
        this.list[index].firstName = res.data.data.updateReaderName.firstName;
      }
      else {
        const operationType = `mutation`;
        const operationName = `updateAuthorName`;
        const payload = `{id: "${el.id}", firstName: "${this.input}"}`;
        const fieldsToGet = `{firstName}`;
        
        const res = await graphql.gQuery({operationName, operationType, payload, fieldsToGet});
        this.list[index].firstName = res.data.data.updateAuthorName.firstName;
      }
    },
    async detachBookFromReader(readerId, index, idx) {
      const res = await graphql.gQuery({
        operationType: `mutation`,
        operationName: `detachBookFromReader`,
        payload: `{readerId: "${readerId}", bookId: "${idx}"}`,
        fieldsToGet: `{books {id, name, authors {id, firstName}}}`
      });
      this.list[index].books.splice(idx, 1);
    },
    async detachAuthorFromBook(bookId, index, idx) {
      const res = await graphql.gQuery({
        operationType: `mutation`,
        operationName: `detachAuthorFromBook`,
        payload: `{authorId: "${idx}", bookId: "${bookId}"}`,
        fieldsToGet: `{authors {id, firstName}}`
      });
      this.list[index].authors.splice(idx, 1);
    },
  },
}
</script>

<style lang="scss" scoped src="./table.component.scss"></style>