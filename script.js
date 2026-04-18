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

function addBookToLibrary(author, title, pagesAmount, read) {
    const newBook = new Book(author, title,pagesAmount, read);
    myLibrary.push(newBook);
}

function showBook() {
    const newDiv = document.createElement('div');
    const lastBook = myLibrary.at(-1);
    const uuidLastBook = lastBook.uuid;
    newDiv.classList.add('book', `book__${uuidLastBook}`);

    const dltBtn = document.createElement('button');
    dltBtn.textContent = 'delete book';
    dltBtn.classList.add('dltBtn', `${uuidLastBook}`);

    newDiv.textContent =`
        the author is ${lastBook.author},
        the title is ${lastBook.title},
        pages amount is ${lastBook.pagesAmount},
        and you ${lastBook.read === 'true' ? 'read it' : "didn't read it"}
    `;

    document.body.appendChild(newDiv);
    newDiv.appendChild(dltBtn);

    dltBtn.addEventListener('click', () => {
        const dtlClass = `${dltBtn.classList[1]}`;
        myLibrary = myLibrary.filter((it) => it.uuid !== dtlClass);
        console.log(myLibrary);
        document.querySelector(`.book__${dtlClass}`).remove();
    }
    )
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
    addBookToLibrary(formData.get('author'), formData.get('title'), formData.get('pagesAmount'), formData.get('read'));
    showBook();
})