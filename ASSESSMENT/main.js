let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "SmartTelevision",
        tag: "SmartTelevision",
        price: 30000,
        inCart: 0
    },
    {
        name: "WristWatch",
        tag: "WristWatch",
        price: 8500,
        inCart: 0
    },
    {
        name: "T-Shirts",
        tag: "T-Shirts",
        price: 1800,
        inCart: 0
    },
    {
        name: "RubberShoes",
        tag: "RubberShoes",
        price: 7500,
        inCart: 0
    },
    {
        name: "Laptop Asus",
        tag: "Laptop Asus",
        price: 28500,
        inCart: 0
    },
    {
        name: "WirelessSpeaker",
        tag: "WirelessSpeaker",
        price: 3500,
        inCart: 0
    },


];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;

    }
}

function cartNumbers(product) {
   
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if( productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
   
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>    
                <img src="./img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease " 
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" 
                name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                Php${item.inCart * item.price}
            </div>
            `

        });

        productContainer.innerHTML += `
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">
                    Cart Total
                </h4>
                <h4 class="cartTotal">
                    Php${cartCost}
                </h4>
        `
    }
}


onLoadCartNumbers();
displayCart();