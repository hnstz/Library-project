let myLibrary = [];

function Book(author, title, pagesAmount, read) {
    if(!new.target){
        throw Error("Please, use operator 'new' in order to create a book");
    }
    this.uuid = self.crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pagesAmount = pagesAmount;
    this.read = read;
}

Book.prototype.toggleRead = function(){

}

function addBookToLibrary(author, title, pagesAmount, read) {
    const newBook = new Book(author, title,pagesAmount, read);
    myLibrary.push(newBook);
}

function bookRender(bookId, newDiv, read) {

    const dltBtn = document.createElement('button');
    dltBtn.textContent = 'delete';
    dltBtn.classList.add('dltBtn', bookId);

    dltBtn.addEventListener('click', () => {
        myLibrary = myLibrary.filter((it) => it.uuid !== bookId);
        document.querySelector(`.book__${bookId}`).remove();
    });
    const readSwitcher = document.createElement('div');
    readSwitcher.classList.add('readSwitcher');

    const textNode = document.createElement('p');
    textNode.textContent = 'read';

    const label = document.createElement('label');
    label.classList.add('switchRead')
    
    

    const span = document.createElement('span');
    span.classList.add('slider');

    const input = document.createElement('input');
    input.classList.add('toggleBtn');
    input.setAttribute('type', 'checkbox');
    input.checked = (read === 'true') ? true : false;

    const main = document.querySelector('main');

    main.appendChild(newDiv);
    newDiv.append(readSwitcher, dltBtn, textNode, label);
    
    label.appendChild(input);
    label.appendChild(span);
}


function showBook() {
    const newDiv = document.createElement('div');
    const book = myLibrary.at(-1);
    newDiv.classList.add('book', `book__${book.uuid}`);
    newDiv.innerHTML = `
        title<br><span class="bookValue">${book.title}</span><br>
        author<br><span class="bookValue">${book.author}</span><br> 
        pages amount<br><span class="bookValue">${book.pagesAmount}</span><br>
    `;
    bookRender(book.uuid, newDiv, book.read);
    
}

const form = document.querySelector('form');

// отображать форму, при нажатии на кнопку
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {    
    form.classList.toggle('hiddenForm');
})

// отправка формы (при создании книги)
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (myLibrary.some((item) => {
        return (item.author === formData.get('author') &&
            item.title === formData.get('title'))
    })){
        alert('you already have such book!');
    } else {
        addBookToLibrary(formData.get('author'), formData.get('title'), formData.get('pagesAmount'), formData.get('read'));
        showBook();
        form.reset();
    }
})