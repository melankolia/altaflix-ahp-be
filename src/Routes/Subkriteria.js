import express from "express";
import SubkriteriaController from "../Controller/Subkriteria/index.js";


const Routers = express.Router();


Routers.get("/:kriteria_id", SubkriteriaController.findByKriteriaId);


export default Routers;