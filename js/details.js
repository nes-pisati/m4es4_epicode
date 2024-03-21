window.onload = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const bookId = searchParams.get("id")

    fetch("https://striveschool-api.herokuapp.com/books/" + bookId)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showResult(data.img, data.title, data.category)
    })
}

function showResult (image, title, category) {
    const bookCover = document.querySelector(".book-cover");
    bookCover.innerHTML = `<img src ="${image}" class="cover-image">`
    const bookInfo = document.querySelector(".book-info");
    const bookTitle = document.createElement("h5");
    bookTitle.textContent = title;
    bookCategory = document.createElement("p")
    bookCategory.textContent = category

    bookInfo.append(bookTitle, bookCategory)
}