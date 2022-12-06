export class Product {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
        });
        if (product.image.startsWith("http")) {
            this.image = product.image;
        } else {
            this.image = `/assets/img/products/${product.image}`;
        }
    }
}
