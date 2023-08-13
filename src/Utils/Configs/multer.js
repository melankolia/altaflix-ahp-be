import multer from "multer"
import path from "path";
import fs from "fs";
import TemplateImage from "../../static-img/images/index.js"

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const pathUri = path.join(TemplateImage.getDirnameImages())
    fs.mkdirSync(pathUri, { recursive: true })
    cb(null, pathUri)
  },
  filename(req, file, cb) {
    cb(null, req.query.fileName)
  }
})
const Upload = multer({ storage: storage });
export default Upload