// {
//   id: string | number,
//   title: string,
//   author: string,
//   year: number,
//   isComplete: boolean,
// }
const RENDER_EVENT = new Event('RENDER_BOOK');

const submitBookForm = document.getElementById('bookForm');
const incompleteList = document.getElementById('incompleteBookList');
const completedList = document.getElementById('completeBookList');

const booksList = [];

const generateElement = (bookObj) => {
  const container = document.createElement('div');
  container.setAttribute('data-bookid', `${bookObj.id}`);
  container.setAttribute('data-testid', 'bookItem');

  if (bookObj.isComplete) {
    container.innerHTML = `<h3 data-testid="bookItemTitle">${bookObj.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${bookObj.author}</p>
            <p data-testid="bookItemYear">Tahun: ${bookObj.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton" class="done-read-btn"> Belum Selesai dibaca</button>
              <button data-testid="bookItemDeleteButton" class="remove-btn" onclick="removeBook(${bookObj.id})">Hapus Buku</button>
              <button data-testid="bookItemEditButton" class="edit-btn">Edit Buku</button>
            </div>`;
  }
  else {
    container.innerHTML = `<h3 data-testid="bookItemTitle">${bookObj.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${bookObj.author}</p>
            <p data-testid="bookItemYear">Tahun: ${bookObj.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton" class="done-read-btn">Selesai dibaca</button>
              <button data-testid="bookItemDeleteButton" class="remove-btn" onclick="removeBook(${bookObj.id})">Hapus Buku</button>
              <button data-testid="bookItemEditButton" class="edit-btn">Edit Buku</button>
            </div>`;
  }

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
};

const removeBook = (bookID) => {
  const indexToRemove = booksList.findIndex((book) => book.id == bookID);
  booksList.splice(indexToRemove, 1);

  document.dispatchEvent(RENDER_EVENT);
};

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
});

submitBookForm.addEventListener('submit', (e) => {
  addBook();
  console.log(booksList);
  submitBookForm.value = '';
  e.preventDefault();
});
// Do your work here...
console.log('Hello, world!');