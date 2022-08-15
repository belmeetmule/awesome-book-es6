// import modules from other sources
import { DateTime as localDate } from './modules/luxon.js';
import Book from './modules/Book.js';
import UI from './modules/ui.js';

const dateTime = document.querySelector('.date-time');
// dateTime.innerHTML = new Date().toLocaleString();
const dt = localDate.now();
dateTime.innerHTML = dt.toLocaleString(localDate.DATETIME_MED);

const list = document.getElementById('list');
const addList = document.getElementById('add');
const contact = document.getElementById('contact');
const displaySection = document.getElementById('book-list');
const inputSection = document.querySelector('.book-input');
const contactSection = document.querySelector('.contact-section');

// eslint-disable-next-line max-classes-per-file

class Collection {
  // eslint-disable-next-line no-unused-vars
  constructor(books) {
    this.books = [];
  }

    add = (book) => {
      if (this.books === null) {
        this.books = [];
      }
      this.books.push(book);
      localStorage.setItem('Collection', JSON.stringify(this.books));
      UI.addBookToList(book);
    }

    remove = (target) => {
      const book = target.parentElement.parentElement;

      this.books = JSON.parse(localStorage.getItem('Collection'));

      this.books.forEach((item, index) => {
        if (book.firstElementChild.innerHTML === (`"${item.title}" by ${item.author}`)) {
          this.books = this.books.filter((i) => i !== this.books[index]);
        }
      });
      localStorage.setItem('Collection', JSON.stringify(this.books));
      UI.deleteBook(book);
    }
}

const myCollection = new Collection();

list.addEventListener('click', (e) => {
  const h = document.querySelector('h1');
  h.innerHTML = 'All awesome books';

  list.style.color = 'blue';
  addList.style.color = 'black';
  contact.style.color = 'black';

  dateTime.style.display = 'block';
  displaySection.style.display = 'block';
  inputSection.style.display = 'none';
  contactSection.style.display = 'none';
  e.preventDefault();
});

const deletebtn = document.querySelectorAll('.remove');

deletebtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.class === 'remove') {
      // UI.deleteBook(e.target);
      myCollection.remove(e.target);
    }
    e.preventDefault();
  });
});

// for the add section of the page
addList.addEventListener('click', (e) => {
  const h = document.querySelector('h1');
  h.innerHTML = 'Add a new book';

  addList.style.color = 'blue';
  list.style.color = 'black';
  contact.style.color = 'black';
  dateTime.style.display = 'block';
  displaySection.style.display = 'none';
  contactSection.style.display = 'none';
  inputSection.style.display = 'block';
  inputSection.innerHTML = `
                          <br>
                          <input type="text" name="title"  class ="title" placeholder="Title" required>
                          <br><br>
                          <input type="text" name="title"  class="author" placeholder="Author" required>
                          <br><br>
                          <button type="submit" class="btn">Add</button>
`;
  e.preventDefault();

  // for add button
  const addbtn = document.querySelector('.btn');
  addbtn.addEventListener('click', (e) => {
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    if (title === '' || author === '') {
      // eslint-disable-next-line no-alert
      alert('Please fill in all fields');
    } else {
      const newBook = new Book(title, author);
      myCollection.add(newBook);
      // UI.addBookToList(newBook);
      UI.clearFields();
      e.preventDefault();
    }
  });
});

// contact
contact.addEventListener('click', (e) => {
  contact.style.color = 'blue';
  list.style.color = 'black';
  addList.style.color = 'black';
  displaySection.style.display = 'none';
  inputSection.style.display = 'none';
  dateTime.style.display = 'none';
  contactSection.style.display = 'flex';
  const h = document.querySelector('h1');
  h.innerHTML = 'Contact information';
  contactSection.innerHTML = `<p>Do you have any questions or you just want to say "Hello"? <br> You can reach out to us!<p>
                              <br>
                              <ul>
                                  <li>Our email: mail@mail.com</li>
                                  <li>Our phone: +1 (123) 456-7890</li>
                                  <li>Our address: 123 Main St, Anytown, USA</li>
                              </ul>
                              `;
  e.preventDefault();
});

window.onload = () => {
  myCollection.books = JSON.parse(localStorage.getItem('Collection'));
  UI.displayBooks(myCollection.books);

  const deletebtn = document.querySelectorAll('.remove');

  deletebtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      myCollection.remove(e.target);
      e.preventDefault();
    });
  });
};
