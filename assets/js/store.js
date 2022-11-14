import { Category } from "./class/category.js";
let data = [];

fetch("/data.json")
    .then((response) => response.json())
    .then((d) => {
        d.forEach((category) => {
            data.push(new Category(category));
        });
        paint();
    });

function paint() {
    let productosElem = document.querySelector(".productos");
    data.forEach((category) => {
        productosElem.innerHTML += `
        <div class="category">
            <h2>${category.name} (${category.products.length})</h2>
        </div>
        `;

        category.products.forEach((product) => {
            let categories = document.querySelectorAll(".category");
            let lastCategory = categories[categories.length - 1];

            lastCategory.innerHTML += `
                <ul>
                    <b>${product.name}</b>
                    <li>Descripcion: ${product.description}</li>
                    <li>Precio: ${product.price} COP</li>
                    <img src="${product.image}" width="300px">
                    <a href="https://api.whatsapp.com/send/?phone=573108017447&text=Hola, quisiera comprar ${product.name}">Comprar</a>
                </ul>
            `;
        });
    });
}
