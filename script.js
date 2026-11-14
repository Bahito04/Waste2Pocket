// Get previously saved purchases
let savedPurchases = JSON.parse(localStorage.getItem("myPurchases")) || [];

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

    // View Details button
    if (event.target.matches(".product-card button:not(.buy-button)")) {

        let product = event.target.parentElement;

        let name = product.querySelector("h3").textContent;
        let details = product.querySelectorAll("p");

        document.getElementById("detailName").textContent = name;
        document.getElementById("detailQuantity").textContent = details[0].textContent;
        document.getElementById("detailLocation").textContent = details[1].textContent;

        detailsPopup.style.display = "flex";
    }

    // Buy button
    else if (event.target.matches(".buy-button")) {

        let product = event.target.parentElement;

        let name = product.querySelector("h3").textContent;
        let details = product.querySelectorAll("p");

        let newPurchase = {
            name: name,
            quantity: details[0].textContent.replace("Quantity: ", "").replace(" kg", ""),
            location: details[1].textContent.replace("Location: ", "")
        };

        // Save purchase
        savedPurchases.push(newPurchase);

        localStorage.setItem("myPurchases", JSON.stringify(savedPurchases));

        // Update My Purchases
        displayPurchases();

        alert("Product added to My Purchases!");
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
const impactLink = document.getElementById("impactLink");
const impactSection = document.getElementById("impactSection");

// Open Marketplace
marketplaceLink.addEventListener("click", function(event) {
    event.preventDefault();

    marketplaceSection.style.display = "block";
    purchasesSection.style.display = "none";
    impactSection.style.display = "none";
});

// Open My Purchases
purchasesLink.addEventListener("click", function(event) {
    event.preventDefault();

    marketplaceSection.style.display = "none";
    purchasesSection.style.display = "block";
    impactSection.style.display = "none";
});

// Open My Impact
impactLink.addEventListener("click", function(event) {
    event.preventDefault();

    marketplaceSection.style.display = "none";
    purchasesSection.style.display = "none";
    impactSection.style.display = "block";

    updateImpact();
});

// Display My Purchases
function displayPurchases() {

    const purchasesContainer = document.getElementById("purchasesContainer");

    purchasesContainer.innerHTML = "";

    if (savedPurchases.length === 0) {
        purchasesContainer.innerHTML =
            "<p>You haven't purchased anything yet.</p>";
        return;
    }

    savedPurchases.forEach(function(product) {

        let purchaseCard = document.createElement("div");

        purchaseCard.classList.add("product-card");

        let name = document.createElement("h3");
        name.textContent = product.name;

        let quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + product.quantity + " kg";

        let location = document.createElement("p");
        location.textContent = "Location: " + product.location;

        let status = document.createElement("p");
        status.textContent = "Status: Purchased";

        purchaseCard.appendChild(name);
        purchaseCard.appendChild(quantity);
        purchaseCard.appendChild(location);
        purchaseCard.appendChild(status);

        purchasesContainer.appendChild(purchaseCard);

    });
}

// Display saved purchases when the page loads
displayPurchases();


// My Impact Dashboard
function updateImpact() {

    let totalPurchases = savedPurchases.length;
    let totalWeight = 0;
    let categories = {};

    savedPurchases.forEach(function(product) {

        totalWeight += Number(product.quantity) || 0;

        let category = product.category || "Other";

        if (categories[category]) {
            categories[category]++;
        } else {
            categories[category] = 1;
        }

    });

    // Update summary cards
    document.getElementById("totalPurchases").textContent = totalPurchases;

    document.getElementById("totalWeight").textContent = totalWeight + " kg";

    document.getElementById("materialTypes").textContent =
        Object.keys(categories).length;

    // Display category breakdown
    let breakdown = document.getElementById("impactBreakdown");

    breakdown.innerHTML = "";

    if (totalPurchases === 0) {
        breakdown.textContent = "You haven't purchased any materials yet.";
        return;
    }

    for (let category in categories) {

        let item = document.createElement("p");

        item.textContent = category + ": " + categories[category] + " purchase(s)";

        breakdown.appendChild(item);

    }
}

// Calculate impact when the page loads
updateImpact();
