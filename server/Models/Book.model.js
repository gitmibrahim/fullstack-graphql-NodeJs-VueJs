export default class Book {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.authors = payload.authors;
  }
}