const express = require("express");
const router = express.Router();
const path = require("path");

const templateDir = path.resolve(__dirname, "../templates");

// Homepage
router.get("/", (req, res) => {
    res.sendFile(path.resolve(templateDir, "homepage.html"));
});

// Store
router.get("/store", (req, res) => {
    res.sendFile(path.resolve(templateDir, "store.html"));
});

// Product Details
router.get("/store/product/*", (req, res) => {
    res.sendFile(path.resolve(templateDir, "product.html"));
});

module.exports = router;
