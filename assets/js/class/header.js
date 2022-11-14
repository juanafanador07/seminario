export class Header {
    constructor(rootElem) {
        this.root = document.querySelector(rootElem);
        this.categories = this.root.querySelector(".header-categories");
    }

    addCategoryLink(category) {
        this.categories.innerHTML += `
            <li>
                <a href="/store?category=${category.normalizedName}">
                    ${category.name}
                </a>
            </li>
        `;
    }
}
