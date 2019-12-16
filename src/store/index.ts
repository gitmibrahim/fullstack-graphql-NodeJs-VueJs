import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    readerId: '',
    bookId: '',
    authorId: '',
    dragSrc: '',
  },
  mutations: {
    setReaderId(state, readerId) {
      state.readerId = readerId
    },
    setBookId(state, bookId) {
      state.bookId = bookId
    },
    setAuthorId(state, authorId) {
      state.authorId = authorId
    },
    setDragSrc(state, dragSrc) {
      state.dragSrc = dragSrc
    },
  },
  actions: {
    setReaderId({ commit }, readerId) {
      commit('setReaderId', readerId)
    },
    setBookId({ commit }, bookId) {
      commit('setBookId', bookId)
    },
    setAuthorId({ commit }, authorId) {
      commit('setAuthorId', authorId)
    },
    setDragSrc({ commit }, dragSrc) {
      commit('setDragSrc', dragSrc)
    },
  },
  modules: {
  },
  getters: {
    readerId: (state) => state.readerId,
    bookId: (state) => state.bookId,
    authorId: (state) => state.authorId,
    dragSrc: (state) => state.dragSrc,
  }
})
