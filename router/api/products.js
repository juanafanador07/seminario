const express = require("express");
const router = express.Router();
const database = require("../../database");

router.get("/all", (req, res) => {
    database.query("SELECT * from Products", function (error, results, fields) {
        if (!error) {
            res.send(results);
        } else {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
});

router.get("/:product_id/", (req, res) => {
    database.query(
        "SELECT * from Products WHERE productId = ?",
        [req.params.product_id],
        function (error, results, fields) {
            if (!error) {
                res.send(results);
            } else {
                console.error(error);
                res.status(500).send("Internal Error");
            }
        }
    );
});

module.exports = router;
