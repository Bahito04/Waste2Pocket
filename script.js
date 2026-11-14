
const searchInput = document.querySelector(".search-section input");
const categoryButtons = document.querySelectorAll(".categories button");
const productContainer = document.querySelector(".product-container");

let selectedCategory = "all";
// Get previously saved listings from the browser
let savedProducts = JSON.parse(localStorage.getItem("wasteListings")) || [];

// Function to create a product card
function createProductCard(product) {

    let newProduct = document.createElement("div");

    newProduct.classList.add("product-card");
    newProduct.dataset.category = product.category;

    newProduct.innerHTML = `
        <div class="product-image">♻️</div>
        <h3></h3>
        <p></p>
        <p></p>
       <button>View Details</button>
<button class="buy-button">Buy</button>
    `;

    newProduct.querySelector("h3").textContent = product.name;

    let details = newProduct.querySelectorAll("p");

    details[0].textContent = "Quantity: " + product.quantity + " kg";
    details[1].textContent = "Location: " + product.location;

    productContainer.appendChild(newProduct);
}

// Display previously saved listings
savedProducts.forEach(function(product) {
    createProductCard(product);
});


// Filter products
function filterProducts() {
    let searchValue = searchInput.value.toLowerCase();

    // Get all product cards, including newly added ones
    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {
        let productName = product.querySelector("h3").textContent.toLowerCase();
        let productCategory = product.dataset.category;

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory = selectedCategory === "all" ||
                              productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

// Search
searchInput.addEventListener("input", filterProducts);

// Category filtering
categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.textContent.toLowerCase();

        if (selectedCategory === "all materials") {
            selectedCategory = "all";
        }

        filterProducts();
    });
});

// Product details popup
const detailsPopup = document.getElementById("detailsPopup");
const closePopup = document.getElementById("closePopup");
const closeButton = document.getElementById("closeButton");

// Listen for clicks on all product cards, including new ones
productContainer.addEventListener("click", function(event) {

    if (event.target.matches(".product-card button")) {

        let product = event.target.parentElement;

        let name = product.querySelector("h3").textContent;
        let details = product.querySelectorAll("p");

        document.getElementById("detailName").textContent = name;
        document.getElementById("detailQuantity").textContent = details[0].textContent;
        document.getElementById("detailLocation").textContent = details[1].textContent;

        detailsPopup.style.display = "flex";
    }
});

// Close details popup
closePopup.addEventListener("click", function() {
    detailsPopup.style.display = "none";
});

closeButton.addEventListener("click", function() {
    detailsPopup.style.display = "none";
});

// Sell Waste Popup
const sellButton = document.querySelector(".sell-button");
const sellPopup = document.getElementById("sellPopup");
const closeSell = document.getElementById("closeSell");
const sellForm = document.getElementById("sellForm");

// Open form
sellButton.addEventListener("click", function() {
    sellPopup.style.display = "flex";
});

// Close form
closeSell.addEventListener("click", function() {
    sellPopup.style.display = "none";
});

// Submit listing

// Submit listing
sellForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("materialName").value;
    let category = document.getElementById("materialCategory").value;
    let quantity = document.getElementById("materialQuantity").value;
    let location = document.getElementById("materialLocation").value;

    // Create a product object
    let newProduct = {
        name: name,
        category: category,
        quantity: quantity,
        location: location
    };

    // Save the listing in our array
    savedProducts.push(newProduct);

    // Store the updated array in the browser
    localStorage.setItem("wasteListings", JSON.stringify(savedProducts));

    // Display the new product
    createProductCard(newProduct);

    // Apply current search and category filters
    filterProducts();

    // Reset and close the form
    sellForm.reset();
    sellPopup.style.display = "none";

    alert("Your listing has been saved successfully!");
});

// Sidebar Navigation

const marketplaceLink = document.getElementById("marketplaceLink");
const purchasesLink = document.getElementById("purchasesLink");

const marketplaceSection = document.getElementById("marketplaceSection");
const purchasesSection = document.getElementById("purchasesSection");

// Open Marketplace
marketplaceLink.addEventListener("click", function(event) {
    event.preventDefault();

    marketplaceSection.style.display = "block";
    purchasesSection.style.display = "none";
});

// Open My Purchases
purchasesLink.addEventListener("click", function(event) {
    event.preventDefault();

    marketplaceSection.style.display = "none";
    purchasesSection.style.display = "block";
});