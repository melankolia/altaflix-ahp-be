import express from "express";
import Users from "./Users.js"
import Divisi from "./Divisi.js";

import AuthCheck from "../Utils/Helper/AuthCheck.js";


const Routers = express.Router();

Routers.use("/user", Users);
Routers.use("/divisi", AuthCheck.token, Divisi)

Routers.use("/", (req, res, next) =>
    res.send("Node JS Running")
);

export default Routers;