require("dotenv").config();
const express = require("express");
const User = require("./users/model")
const port = process.env.PORT || 5001;
const userRouter = require("./users/routes")

const app = express();

app.use(express.json());

app.use(userRouter);

const syncTables = () => {
    User.sync({ alter: true });
}

app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is working" })
})

app.listen(port, () => {
    syncTables();
    console.log(`app listening on post ${port}`);
})