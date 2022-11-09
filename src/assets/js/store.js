let data;

fetch("/data.json")
    .then((response) => response.json())
    .then((d) => {
        data = d;
        paint();
    });

function paint() {
    let productosElem = document.querySelector(".productos");
    data.forEach((cat) => {
        productosElem.innerHTML += new Category(cat).toHTML();
    });
}

class Category {
    constructor(category) {
        this.name = category.name;
        this.products = category.products;
    }

    toHTML() {
        let html = `
            <div>
                <h2>${this.name} (${this.products.length})</h2>
        `;
        this.products.forEach((prod) => {
            html += new Product(prod).toHTML();
        });
        html += "</div>";
        return html;
    }
}

class Product {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
    }

    toHTML() {
        return `
            <ul>
                <b>${this.name}</b>
                <li>Descripcion: ${this.description}</li>
                <li>Precio: ${this.price.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                })} COP</li>
                <img src="${this.image}" width="300px">
                <a href="https://api.whatsapp.com/send/?phone=573108017447&text=Hola, quisiera comprar ${
                    this.name
                }">Comprar</a>
            </ul>
        `;
    }
}
