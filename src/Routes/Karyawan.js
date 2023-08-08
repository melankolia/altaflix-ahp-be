import express from "express";
import KaryawanController from "../Controller/Karyawan/index.js"


const Routers = express.Router();

Routers.delete("/:karyawan_id", KaryawanController.deleteKaryawan)
Routers.post("/", KaryawanController.createKaryawan)
Routers.get("/", KaryawanController.findAllKaryawan);
Routers.get("/:karyawan_id", KaryawanController.findByKaryawanId);

export default Routers;