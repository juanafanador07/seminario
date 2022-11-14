import { Category } from "./class/category.js";
import { Gallery } from "./class/gallery.js";
import { Header } from "./class/header.js";

const gallery = new Gallery(".products");
const header = new Header(".header");
// Obtain data
fetch("/data.json")
    .then((response) => response.json())
    .then((d) => {
        d.forEach((cat, index) => {
            const category = new Category(cat);
            gallery.addCategory(category, index);
            header.addCategoryLink(category);
        });
    });
