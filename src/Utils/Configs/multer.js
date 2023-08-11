import multer from "multer"
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const pathUri = path.join(
      'src',
      'static-img',
      'images',
    )

    console.log(pathUri);
    fs.mkdirSync(pathUri, { recursive: true })
    cb(null, pathUri)
  },
  filename(req, file, cb) {
    cb(null, req.query.karyawanId + '.jpeg')
  }
})
const Upload = multer({ storage: storage });
export default Upload