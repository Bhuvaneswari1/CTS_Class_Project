const user = localStorage.getItem('loggedInUser');

if(!user) window.location.href = "index.html"

document.getElementById("welcomeUser").textContent = `Hello ${user}`;

const cartCount = document.getElementById("cartCount");

function updateCartCounter(){
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartCount.textContent = cart.length;
}

updateCartCounter();

fetch("product.json")
.then(response => response.json())
.then(products =>{
    const productList = document.getElementById("productList");

    products.forEach(product =>{
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML =
        `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class = "card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}></p>
                <p class="text-success fw-bold">₹${product.price}</p>
                <button class="btn btn-sm btn-primary add-to-cart">Add to Cart</p>
            </div>
        </div>
        `;

        const card= col.querySelector(".card")
        card.querySelector(".add-to-cart").addEventListener("click", ()=>{
            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
            cart.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cart));
            updateCartCounter();
            alert(`${product.name} added to cart!`);
        })
        productList.appendChild(col);
    })
})