
const searchInput = document.querySelector(".search-section input");

const products = document.querySelectorAll(".product-card");

const categoryButtons = document.querySelectorAll(".categories button");

let selectedCategory = "all";

// Filter products
function filterProducts() {

    let searchValue = searchInput.value.toLowerCase();

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


const viewButtons = document.querySelectorAll(".product-card button");

const detailsPopup = document.getElementById("detailsPopup");

const closePopup = document.getElementById("closePopup");

const closeButton = document.getElementById("closeButton");

viewButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let product = button.parentElement;

        let name = product.querySelector("h3").textContent;

        let details = product.querySelectorAll("p");

        document.getElementById("detailName").textContent = name;

        document.getElementById("detailQuantity").textContent = details[0].textContent;

        document.getElementById("detailLocation").textContent = details[1].textContent;

        detailsPopup.style.display = "flex";

    });

});

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

// Open the form
sellButton.addEventListener("click", function() {
    sellPopup.style.display = "flex";
});

// Close the form
closeSell.addEventListener("click", function() {
    sellPopup.style.display = "none";
});

// Submit the form
sellForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("materialName").value;
    let quantity = document.getElementById("materialQuantity").value;
    let location = document.getElementById("materialLocation").value;

    alert("Your listing has been submitted successfully!");

    sellForm.reset();
    sellPopup.style.display = "none";
});