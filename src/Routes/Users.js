import express from "express";
import UserController from "../Controller/User/index.js"
import AuthCheck from "../Utils/Helper/AuthCheck.js";


const Routers = express.Router();

Routers.post("/login", UserController.userLogin)
Routers.delete("/:user_id", AuthCheck.token, UserController.deleteUser)
Routers.post("/", AuthCheck.token, UserController.registerUser)
Routers.get("/", UserController.findAllUser);
Routers.get("/:user_id", UserController.findByUserid);

export default Routers;