//Load product list

fetch("product.json")
.then(response => response.json())
.then(products => {
    const productList = document.getElementById("productList");
    products.forEach(product =>{
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="text-success fw-bold">₹${product.price}</p>
            </div>
        </div>
        `;
        productList.appendChild(col);
    })
})
.catch(err=>console.error("Error loading products: ",err));