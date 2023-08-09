import express from "express";
import PerhitunganController from "../Controller/Perhitungan/index.js";

const Routers = express.Router();

Routers.get("/kriteria", PerhitunganController.findPerhitunganKriteria);
Routers.post("/kriteria", PerhitunganController.insertNilai);
Routers.delete("/kriteria", PerhitunganController.deleteNilai)
Routers.post("/subkriteria", PerhitunganController.insertNilaiSub);
Routers.delete("/subkriteria", PerhitunganController.deleteNilaiSub)
Routers.get("/subkriteria/:kriteria_id", PerhitunganController.findPerhitunganSubkriteria);


export default Routers;