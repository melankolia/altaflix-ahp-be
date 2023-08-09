import express from "express";
import NilaiController from "../Controller/Nilai/index.js";

const Routers = express.Router();

Routers.get('/:nilai_id', NilaiController.findById);
Routers.get('/', NilaiController.findAll);
Routers.post('/', NilaiController.insertData);
Routers.delete('/:nilai_id', NilaiController.deleteData)


export default Routers;