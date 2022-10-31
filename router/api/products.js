const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
    res.send("All products");
});

router.get("/:product_id", (req, res) => {
    res.send(`Product ${req.params.product_id}`);
});

module.exports = router;
