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
