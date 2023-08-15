import express from 'express';
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import fs from "fs";
import Router from "./Routes/index.js";
import Template from './Template/index.js';
import TemplateImages from "./static-img/images/index.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Init Morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

app.use(logger("combined", { stream: accessLogStream }));
app.use(logger("combined"))

// Manage cors, menentukan situs mana yang boleh akses, situs yang mana yang di blacklist
app.use(cors());

app.use("/", express.static(path.join(Template.getDirname())));

const directory = path.join(TemplateImages.getDirnameImages())
app.use("/", express.static(path.join(directory)));


// Init Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init Cross Server Scripting
app.use(helmet.xssFilter());

// Init Router
app.use("/", Router);

app.listen(process.env.SERVER_PORT || 80, () =>
    console.log(`Server Running di Port ${process.env.SERVER_PORT || 80}`)
);
