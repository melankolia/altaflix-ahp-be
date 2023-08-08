import express from "express";
import ProjekController from "../Controller/Projek/index.js"


const Routers = express.Router();

Routers.delete("/:projek_id", ProjekController.deleteProjek)
Routers.post("/", ProjekController.createProjek)
Routers.get("/", ProjekController.findAllProjek);
Routers.get("/:projek_id", ProjekController.findByProjekId);

export default Routers;