require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
const port = 3000;

// Modify HTTP-Headers
app.use(helmet());

// Connect to database
require("./database");

//Router Imports
// WEB
app.use("/", require("./router/web"));

// Products API
app.use("/api/products", require("./router/api/products"));

// Static Files
app.use(express.static("public"));

// Error 404
app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/templates/404.html");
});

// Init the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
