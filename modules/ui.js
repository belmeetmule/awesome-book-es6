export default class UI {
    static deleteBook = (book) => {
      book.remove();
    }

    static addBookToList = (newBook) => {
      const display = document.getElementById('book-list');
      const div = document.createElement('div');
      div.classList = 'book';
      div.innerHTML = `<div>"${newBook.title}" by ${newBook.author}</div><div><button class="remove">Remove</button></div>`;
      display.appendChild(div);
    }

  static displayBooks = (books) => {
    const display = document.getElementById('book-list');
    const con = document.querySelector('body');
    const h = document.createElement('h1');
    con.insertBefore(h, display);
    h.innerHTML = 'All awesome books';

    if (books) {
      books.forEach((book) => UI.addBookToList(book));
    }
  }

  static clearFields = () => {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}