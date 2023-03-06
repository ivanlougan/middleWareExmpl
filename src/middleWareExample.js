require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;

const exampleRouter = require("../middle");

const app = express();

app.use(express.json());

app.use(exampleRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is working" })
})

app.listen(port, () => {
    console.log(`app listening on post ${port}`);
})