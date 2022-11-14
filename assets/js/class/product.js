export class Product {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
        });
        this.image = product.image;
    }
}
