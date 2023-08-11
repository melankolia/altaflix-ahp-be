import express from "express";
import KaryawanController from "../Controller/Karyawan/index.js"


const Routers = express.Router();

Routers.get("/nilai", KaryawanController.findByNilai);
Routers.post("/", KaryawanController.createKaryawan)
Routers.post("/upload_photo", KaryawanController.uploadPhoto)
Routers.get("/", KaryawanController.findAllKaryawan);
Routers.delete("/:karyawan_id", KaryawanController.deleteKaryawan)
Routers.get("/:karyawan_id", KaryawanController.findByKaryawanId);

export default Routers;