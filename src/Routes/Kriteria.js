import express from "express";
import KriteriaController from "../Controller/Kriteria/index.js"


const Routers = express.Router();

Routers.delete("/:kriteria_id", KriteriaController.deleteKriteria)
Routers.post("/", KriteriaController.createKriteria)
Routers.get("/", KriteriaController.findAllKriteria);
Routers.get("/:kriteria_id", KriteriaController.findByKriteriaId);

export default Routers;