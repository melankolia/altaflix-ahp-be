import express from "express";
import Users from "./Users.js"
import Divisi from "./Divisi.js";
import Projek from "./Projek.js";
import Karyawan from "./Karyawan.js";
import Kriteria from "./Kriteria.js";
import Subkriteria from "./Subkriteria.js";
import Perhitungan from "./Perhitungan.js";
import Nilai from "./Nilai.js";

import AuthCheck from "../Utils/Helper/AuthCheck.js";


const Routers = express.Router();

Routers.use("/user", Users);
Routers.use("/divisi", AuthCheck.token, Divisi);
Routers.use("/projek", AuthCheck.token, Projek);
Routers.use("/karyawan", AuthCheck.token, Karyawan);
Routers.use("/kriteria", AuthCheck.token, Kriteria);
Routers.use("/perhitungan", AuthCheck.token, Perhitungan);
Routers.use("/nilai", AuthCheck.token, Nilai)
Routers.use("/subkriteria", AuthCheck.token, Subkriteria)

Routers.use("/", (req, res, next) =>
    res.send("Node JS Running")
);

export default Routers;