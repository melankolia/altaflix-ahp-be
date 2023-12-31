import express from "express";
import KaryawanController from "../Controller/Karyawan/index.js"


const Routers = express.Router();

Routers.get("/nilai", KaryawanController.findByNilai);
Routers.post("/", KaryawanController.createKaryawan)
Routers.post("/upload_photo", KaryawanController.uploadPhoto)
Routers.get("/report", KaryawanController.printReport)
Routers.get("/", KaryawanController.findAllKaryawan);
Routers.get("/report/:karyawan_id", KaryawanController.printReportDetail);
Routers.get("/:karyawan_id", KaryawanController.findByKaryawanId);
Routers.delete("/:karyawan_id", KaryawanController.deleteKaryawan)

export default Routers;