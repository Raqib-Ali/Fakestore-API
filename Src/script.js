
function loadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (categories) {
            categories.unshift("ALL");
            categories.map(function (category) {
                console.log(category);
                option = document.createElement("option");
                option.text = category.toUpperCase();
                option.value = category;
                document.getElementById("lstCategories").appendChild(option);
            })
        })
}

function loadItems(url) {
    alert(url);
    document.getElementById("main").innerHTML = "";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            products.map(function (product) {
                card = document.createElement("div");
                card.className = "card m-2 p-2 main-products";
                card.style.width = "250px"
                card.style.height = "350px"
                card.innerHTML = `
          <a href="javascript:openProduct(${product.id})"><img  src=${product.image} class="card-img-top" height="150px">
            <div class="card-header fw-bold overflow-auto">${product.title}</div> 
            <div class="card-body fs-5 ">${product.price.toLocaleString('en-in', { style: 'currency', currency: 'INR' })}</div> </a>
            <div class="card-footer ">
                <button onclick="cartCount(${product.id})" class="btn btn-success w-100">Add to cart <span class="bi bi-cart"></span></button>
            </div>
            `;
                document.getElementById("main").appendChild(card);
            })
        })
}

function openProduct(id) {
    document.getElementById("main").innerHTML = "";
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            card = document.createElement("div");
            card.className = "d-flex border p-3";
            col1 = document.createElement("div");
            col2 = document.createElement("div");
            col2.className="ms-4";
            col1.innerHTML = `<a href="${product.image}" target="_blank"><img width="350px" class="border p-3" src="${product.image}"></a>`;
            col2.innerHTML = `<h2>${product.title}</h2>
            <div class="mb-2 fs-5"><span class=" badge bg-success text-white">${product.rating.rate}<span class="bi ms-1 bi-star-fill"></span></span>
            <span class="ms-3"><span class="">${product.rating.count}</span>&nbsp;<span>Ratings</span></span>
            </div>
        <div class="fs-5">${product.description}</div>`;
            card.appendChild(col1);
            card.appendChild(col2);
            document.getElementById("main").appendChild(card);
        })

}

function changeCategory() { 
    var changedCategory = document.getElementById("lstCategories").value;
    if (changedCategory == "ALL") {
        loadItems(`https://fakestoreapi.com/products`);
    }
    else {
        loadItems(`https://fakestoreapi.com/products/category/${changedCategory}`);
    }
}

var count = [];
function cartCount(idNum) {
    fetch(`https://fakestoreapi.com/products/${idNum}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            count.push(product);
            alert(`${product.title}\n Added into cart`);
            loadCart();
            updatePriceCount();
        })

}

function loadCart() {
    document.getElementById("cartItems").innerHTML = "";
    count.map(function (product) {
        row = document.createElement("tr");
        tdTitle = document.createElement("td");
        tdTitle.innerHTML = `${product.title}`;
        tdTitle.className = "fw-bold";
        tdPreview = document.createElement("td");
        tdPreview.innerHTML = `<img src=${product.image} hight="50px" width="50px">`
        tdPrice = document.createElement("td");
        tdPrice.innerHTML = `${product.price}`;
        tdDelete = document.createElement("td");
        tdDelete.innerHTML = `<button onclick="deleteItem(${product.id})" class="btn btn-white mt-2 bi bi-trash-fill"></button>`;

        row.appendChild(tdTitle);
        row.appendChild(tdPreview);
        row.appendChild(tdPrice);
        row.appendChild(tdDelete);
        document.getElementById("cartItems").appendChild(row);
        updatePriceCount();
    })

}


function deleteItem(idNum) {
    index = 0;
    count.map(function (product) {
        if (product.id == idNum) {
            count.splice(index, 1);
            loadCart(idNum);
            updatePriceCount();
        }
        index++;
    })
}

function updatePriceCount() {
    var totalPrice = 0;
    count.map(function (product) {
        totalPrice += product.price;
    })
    document.getElementById("price").innerHTML = `Total price : ${totalPrice.toLocaleString('en-in', { style: 'currency', currency: 'INR' })}`;
    document.getElementById("badgeCount").innerHTML = count.length;
}


function bodyLoad() {
    loadCategories();
    loadItems("https://fakestoreapi.com/products");
}
