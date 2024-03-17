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

let inputValue = inputField.value;

showDialog.addEventListener("click", ()=> {
    dialog.showModal();
})

closeDialog.addEventListener("click", ()=> {
    dialog.close();
})

function bookCard(image, title, price) {
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
    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to cart"
    cartButton.id = "add-button";
    cartButton.classList = "add-button";
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
    const skipButton = document.createElement("button");
    skipButton.textContent = "Skip this book";
    skipButton.id = "skip-button";
    skipButton.classList = "skip-button mt-2";

    card.append(cardImage, cardTitle, cardPrice, cartButton, skipButton)
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
    title.textContent = bookTitle;
    const price = document.createElement("p");
    price.classList = "modalBookPrice"
    price.textContent = bookPrice;
    const newLine = document.createElement("br");

    dialogBody.append(title, price, newLine)
}

//Pulire carrello
function clearCart(){
    const clearButton = document.getElementById("clearCart");
    clearButton.addEventListener("click", ()=>{
        cartArray = [];
        dialogBody.innerHTML = "";
        const deleteText = document.createElement("p");
        deleteText.textContent = "Hai svuotato il carrello!";
        dialogBody.append(deleteText);
        const card = document.getElementsByClassName("clicked");
        card.classList.remove("clicked");
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
    console.log(data);

    data.forEach(data => {
        bookCard(data.img, data.title, data.price)
    });
})

