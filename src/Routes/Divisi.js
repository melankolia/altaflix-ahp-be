import express from "express";
import DivisiController from "../Controller/Divisi/index.js"


const Routers = express.Router();

Routers.delete("/:divisi_id", DivisiController.deleteDivisi)
Routers.post("/", DivisiController.createDivisi)
Routers.get("/", DivisiController.findAllDivisi);
Routers.get("/:divisi_id", DivisiController.findByDivisiId);

export default Routers;