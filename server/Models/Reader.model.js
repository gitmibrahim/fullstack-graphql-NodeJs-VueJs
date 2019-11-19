export default class Reader {
  constructor(payload) {
    this.id = payload.id;
    this.firstName = payload.firstName;
    this.books = payload.books;
  }
}