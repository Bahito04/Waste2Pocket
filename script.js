
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
