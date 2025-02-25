function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    for (let category in productData) {
        let matchedItems = productData[category].filter(item => 
            item.name.toLowerCase().includes(input)
        );

        if (matchedItems.length > 0) {
            let categoryDiv = document.createElement("div");
            categoryDiv.classList.add("product-category");
            categoryDiv.innerHTML = `<h3>${category.replace(/-/g, " ").toUpperCase()}</h3>`;

            matchedItems.forEach(item => {
                let itemDiv = document.createElement("div");
                itemDiv.classList.add("product-item");
                itemDiv.innerHTML = `
                    <span>${item.name}</span> - ${item.price}
                    <button class="buy-button" onclick="addToCart('${item.name}', '${item.price}')">
                      <img src="https://cdn-icons-png.flaticon.com/512/3737/3737372.png" alt="Add to Cart" width="20">
                    </button>
                `;
                categoryDiv.appendChild(itemDiv);
            });

            resultsContainer.appendChild(categoryDiv);
        }
    }
}

// Function to add an item to the cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.push({
        name: name,
        price: price,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to the cart!`);
}