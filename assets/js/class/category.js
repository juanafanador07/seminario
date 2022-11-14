import { Product } from "./product.js";
export class Category {
    constructor(category) {
        this.normalizedName = category.name.replace(" ", "-");
        this.name = category.name;
        this.products = new Array();

        category.products.forEach((product) => {
            this.products.push(new Product(product));
        });
    }
}
