// {
//   id: string | number,
//   title: string,
//   author: string,
//   year: number,
//   isComplete: boolean,
// }

// HELPER FUNCTION
const indexFind = (arr, id) => {
  return arr.findIndex((item) => item.id == id);
};

const checkForStorage = () => {
    return typeof (Storage) !== 'undefined';
};

const getBooksData = () => {
  if (checkForStorage) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  };

  return [];
};

const saveData = () => {
  if (checkForStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksList));
  };
};

// MAIN
const STORAGE_KEY = 'STORAGE_KEY';
const RENDER_EVENT = new Event('RENDER_BOOK');

const submitBookForm = document.getElementById('bookForm');
const incompleteList = document.getElementById('incompleteBookList');
const completedList = document.getElementById('completeBookList');

let booksList = [];

const generateElement = (bookObj) => {
  const container = document.createElement('div');
  container.setAttribute('data-bookid', `${bookObj.id}`);
  container.setAttribute('data-testid', 'bookItem');

  container.innerHTML = `<h3 data-testid="bookItemTitle">${bookObj.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${bookObj.author}</p>
          <p data-testid="bookItemYear">Tahun: ${bookObj.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton" class="done-read-btn" onclick="isDoneRead(${bookObj.id})">${bookObj.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
            <button data-testid="bookItemDeleteButton" class="remove-btn" onclick="removeBook(${bookObj.id})">Hapus Buku</button>
            <button data-testid="bookItemEditButton" class="edit-btn" onclick="editBook(${bookObj.id})">Edit Buku</button>
          </div>`;

  return container;
};

const addBook = () => {
  const bookTitle = document.getElementById('bookFormTitle').value;
  const bookAuthor = document.getElementById('bookFormAuthor').value;
  const bookYear = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;
  
  const bookObj = {
    id: Date.now(),
    title: bookTitle,
    author: bookAuthor,
    year: Number(bookYear),
    isComplete: isComplete
  };

  booksList.push(bookObj)

  document.dispatchEvent(RENDER_EVENT)
  saveData();
};

const isDoneRead = (bookID) => {
  const indexToEdit = indexFind(booksList, bookID);
  booksList[indexToEdit].isComplete = !booksList[indexToEdit].isComplete;

  document.dispatchEvent(RENDER_EVENT);
  saveData();
};

const removeBook = (bookID) => {
  const indexToRemove = indexFind(booksList, bookID);
  booksList.splice(indexToRemove, 1);

  document.dispatchEvent(RENDER_EVENT);
  saveData();
};

const editBook = (bookID) => {
  const indexToEdit = indexFind(booksList, bookID);
  const newTitle = prompt('Ubah judul buku :', booksList[indexToEdit].title);
  const newAuthor = prompt('Ubah penulis buku :', booksList[indexToEdit].author);
  const newYear = prompt('Ubah tahun rilis :', booksList[indexToEdit].year);

  booksList[indexToEdit].title = newTitle
  booksList[indexToEdit].author = newAuthor;
  booksList[indexToEdit].year = Number(newYear);


  document.dispatchEvent(RENDER_EVENT);
  saveData();
};

// HANDLE UPDATE UI AFTER AN EVENT OCCUR
window.addEventListener('load', () => {
  if (checkForStorage) {

    if (localStorage.getItem(STORAGE_KEY) !== null) {
      booksList = JSON.parse(localStorage.getItem(STORAGE_KEY));
      document.dispatchEvent(RENDER_EVENT);
    };

  };
});

document.addEventListener('RENDER_BOOK', () => {
  completedList.innerHTML = '';
  incompleteList.innerHTML = '';

  for (const book of booksList) {
    const bookElement = generateElement(book); // Harus berbentuk Node

    if (book.isComplete) {
      completedList.appendChild(bookElement);
    }
    else {
      incompleteList.appendChild(bookElement);
    }
  };

  console.log(booksList)
});

// HANDLE FORM
submitBookForm.addEventListener('submit', (e) => {
  addBook();
  console.log(booksList);
  submitBookForm.reset();
  e.preventDefault();
});
// Do your work here...
console.log('Hello, world!');