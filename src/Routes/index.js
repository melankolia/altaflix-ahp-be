import express from "express";
import Users from "./Users.js";

const Routers = express.Router();

Routers.use("/user", Users);

Routers.use("/", (req, res, next) =>
    res.send("Node JS Running")
);

export default Routers;