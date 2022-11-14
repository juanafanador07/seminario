export class Gallery {
    constructor(rootElem) {
        this.root = document.querySelector(rootElem);
        this.tabs = this.root.querySelector(".gallery-tabs");
        this.content = this.root.querySelector(".gallery-content");
    }

    addTab(category, index) {
        this.tabs.innerHTML += `
            <li class="nav-item" role="presentation">
                <a class="nav-link ${
                    index == 0 ? "active show" : ""
                }" data-bs-toggle="tab" data-bs-target="#${
            category.normalizedName
        }" aria-selected="true" role="tab">
                    <h4>${category.name}</h4>
                </a>
            </li>`;
    }

    addProduct(product) {
        const content = this.content.querySelectorAll(".category-content");
        const lastElem = content[content.length - 1];
        lastElem.innerHTML += `
            <div class="col-lg-4 products-item">
                <img
                    src="${product.image}"
                    class="products-img img-fluid"
                    alt=""
                />
                <h4 class="name">${product.name}</h4>
                <p class="description">${product.description}</p>
                <p class="price">${product.price}</p>
            </div>
        `;
    }

    addCategory(category, index) {
        this.addTab(category, index);
        this.content.innerHTML += `
            <div class="tab-pane fade ${index == 0 ? "active show" : ""}" id="${
            category.normalizedName
        }">
                <div class="tab-header text-center">
                    <h3>${category.name}</h3>
                </div>
                <div class="row gy-5 category-content"></div>
            </div>`;

        for (let j = 0; j < 3 && j < category.products.length; j++) {
            const product = category.products[j];
            this.addProduct(product);
        }
    }
}
