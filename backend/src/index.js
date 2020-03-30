const express = require("express");
const app = express();
const port = 8080;

app.get("/", ( req, res ) => {
    res.send("Hello world!");
});

app.get("/rob", ( req, res ) => {
    res.send("Hi Rob!");
});

app.listen( port, () => {
    console.log(`server started at http://localhost: ${port}`);
});