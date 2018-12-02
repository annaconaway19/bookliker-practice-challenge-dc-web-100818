document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
});

function fetchBooks() {
  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(data => data.forEach(renderBooks))
}

function renderBooks(book) {
  let bookBullet = document.createElement('li')
  bookBullet.id = book.id
  bookBullet.innerText = book.title
  bookBullet.addEventListener('click', showBook)

  getList().appendChild(bookBullet)
}

function showBook(event) {
  let id = event.target.id
  getBook(id)
}

function getBook(id) {
  fetch(`http://localhost:3000/books/${id}`)
  .then(response => response.json())
  .then(data => bookPanel(data))
}

function bookPanel(data) {
  getBookCont().innerHTML = ''
  let bookId = data.id
  let bookTitle = document.createElement('h2')
  bookTitle.innerText = data.title

  let bookImage= document.createElement('img')
  bookImage.src = data.img_url

  let bookDesc = document.createElement('h4')
  bookDesc.innerText = data.description

  let bookUsers = document.createElement('p')
  bookUsers.id = `users-${data.id}`
  bookUsers.innerText = data.users.map(user => user.username).join(', ')


  let likeButton = document.createElement('button')
  likeButton.innerText = 'Like Book'
  likeButton.dataset.id = data.id
  likeButton.addEventListener('click', (event) => {updateLikes(event, data)})

  getBookCont().appendChild(bookTitle)
  getBookCont().appendChild(bookImage)
  getBookCont().appendChild(bookDesc)
  getBookCont().appendChild(bookUsers)
  getBookCont().appendChild(likeButton)

}

function updateLikes(event, book) {
  event.preventDefault()
  let users = book.users
  let userObj = {users: [{id: 1, username: "pouros"}, ...users]}

  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(data => bookPanel(data))
}

function getList() {
  return document.querySelector('#list')
}

function getBookCont(){
  return document.querySelector('#show-panel')
}
