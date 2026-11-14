const searchInput = document.querySelector(".search-section input");

const products = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function() {

    let searchValue = searchInput.value.toLowerCase();

    products.forEach(function(product) {

        let productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

});


const searchInput = document.querySelector(".search-section input");

const products = document.querySelectorAll(".product-card");

const categoryButtons = document.querySelectorAll(".categories button");

// Function to filter products
function filterProducts() {

    let searchValue = searchInput.value.toLowerCase();

    let selectedCategory = document.querySelector(".categories .active").textContent.toLowerCase();

    products.forEach(function(product) {

        let productName = product.querySelector("h3").textContent.toLowerCase();

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory = selectedCategory === "all materials" ||
                              productName.includes(selectedCategory);

        if (matchesSearch && matchesCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

}

// Search functionality
searchInput.addEventListener("input", filterProducts);

// Category functionality
categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();

    });

});
