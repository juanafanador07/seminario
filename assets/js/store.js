import { Category } from "./class/category.js";
import { Header } from "./class/header.js";

const header = new Header(".header");
let data = [];

fetch("/data.json")
    .then((response) => response.json())
    .then((d) => {
        d.forEach((category) => {
            let cat = new Category(category);
            data.push(cat);
            header.addCategoryLink(cat);
        });

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const categoryNormalizedName = urlParams.get("category");

        const queryCategory = searchCategory(categoryNormalizedName);

        if (queryCategory != null) {
            printCategory(queryCategory);
        } else {
            printAll();
        }
    });

function searchCategory(normalizedName) {
    let category = null;
    data.forEach((cat) => {
        if (cat.normalizedName == normalizedName) {
            category = cat;
        }
    });

    return category;
}

function printAll() {
    let titleElem = document.querySelector(".title");

    data.forEach((category) => {
        printCategory(category);
    });

    titleElem.innerText = "Nuestra Tienda";
}

function printCategory(category) {
    let titleElem = document.querySelector(".title");
    let productsElem = document.querySelector(".card-container");

    titleElem.innerText = category.name;
    category.products.forEach((product) => {
        productsElem.innerHTML += `
            <div class="product-card card mx-auto" data-aos="fade-up">
                <img
                    class="card-img-top"
                    src="${product.image}"
                    alt="${product.name}"
                />
                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                    <h2 class="card-title text-center">${product.name}</h2>
                    <p class="card-text my-3">${product.description}</p>
                    <a
                        href="https://api.whatsapp.com/send/?phone=573102984941&text=Hola, quisiera comprar un ${product.name}"
                        class="btn btn-primary card-link text-center">${product.price}</a>
                </div>
            </div>`;
    });
}
