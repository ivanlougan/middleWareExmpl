const { Router } = require("express");
const exampleRouter = Router();

const finalFunc = async (req, res) => {
    console.log("req.body is finalFunc", req.body);
    res.status(201).json({ message: "success", body: req.body });
}

const middleOne = async (req, res, next) => {
    console.log("start middle", req.body)
    req.body["middleOne"] = "Im from the middleOne func";
    next();
}

const middleTwo = async (req, res, next) => {
    console.log("start middle", req.body);
    req.body["middleTwo"] = "Im from the middleTwo func";
    next();
}

exampleRouter.post("/example", middleOne, middleTwo, finalFunc);

module.exports = exampleRouter;