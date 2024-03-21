let booksArray = [];
let cartArray = [];
let bookItem = 
{
    title: "",
    price: "",
}

const dialog = document.querySelector("dialog");
const dialogBody = document.querySelector("#dialogBody");
const showDialog = document.querySelector(".cart-button");
const closeDialog = document.querySelector("dialog button");
const inputField = document.querySelector(".search-input");

showDialog.addEventListener("click", ()=> {
    dialog.showModal();
})

closeDialog.addEventListener("click", ()=> {
    dialog.close();
    dialog.querySelector("p").textContent = "";
})

function bookCard(image, title, price, id) {
    const cardContainer = document.querySelector(".card-container")
    const card = document.createElement("div");
    card.classList = "card col-5 col-md-4 col-lg-2 pt-2 pb-2";
    const cardImage = document.createElement("img");
    cardImage.src = image;
    cardImage.classList = "card-image"
    const cardTitle = document.createElement("h5");
    cardTitle.textContent = title;
    cardTitle.classList = "book-title mt-2";
    const cardPrice = document.createElement("p");
    cardPrice.textContent = price;
    const buttonContainer = document.createElement("div")
    buttonContainer.classList = "button-container d-flex flex-wrap justify-content-center gap-1"
    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to cart"
    cartButton.id = "add-button";
    cartButton.classList = "add-button";
    //Aggiunta item al carrello
    cartButton.addEventListener("click", ()=> {
        addItem (cardTitle.textContent, cardPrice.textContent)
        cartArray.push(bookItem);
        bookItem = {
            title: "",
            price: "",
        } 
        card.classList.add("clicked")
        itemInCart(cardTitle.textContent, cardPrice.textContent)
    })
    const detailButton = document.createElement("div");
    detailButton.innerHTML = 
    `<a href = "/details.html?id=${id}" target="_blank"><button id="details-button" class="detail-button mt-3">Details</button></a>`
    const skipButton = document.createElement("button");
    skipButton.textContent = "Skip book";
    skipButton.id = "skip-button";
    skipButton.classList = "skip-button mt-3";
    skipButton.addEventListener("click", ()=> {
        card.classList.add("d-none");
    })
    buttonContainer.append(cartButton, detailButton, skipButton)
    card.append(cardImage, cardTitle, cardPrice, buttonContainer)
    cardContainer.append(card)
}

//Aggiungere libro in oggetto
function addItem (title, price) {
    bookItem.title = title;
    bookItem.price = price;
}

//Popolare il modale
function itemInCart(bookTitle, bookPrice) {
    const title = document.createElement("p");
    title.classList = "col-8"
    title.textContent = bookTitle;
    const price = document.createElement("p");
    price.classList = "modalBookPrice col-2"
    price.textContent = bookPrice;

    dialogBody.append(title, price, )
}


//Pulire carrello
function clearCart(){
    const clearButton = document.getElementById("clearCart");
    clearButton.addEventListener("click", ()=>{
        cartArray = [];
        dialogBody.innerHTML = "";
        dialogBody.innerHTML = "<p>Hai svuotato il carrello!</p>";
        const card = document.querySelectorAll(".clicked");
        Array.from(card).forEach((singleCard) => {
                singleCard.classList.remove("clicked");
        })
    })
}

clearCart()

console.log(cartArray);




fetch("https://striveschool-api.herokuapp.com/books")
.then(function(response){
    //console.log(response);

    return response.json();
})

.then(function(data){
    //console.log(data);
    data.forEach(data => {
        booksArray.push(data);
        bookCard(data.img, data.title, data.price, data.asin);
    });
})

console.log(booksArray);

