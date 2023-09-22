import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "documents/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFiletype(file, cb) {
  const fileType = /jpg|jpeg|png|pdf/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images or PDF");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFiletype(file, cb);
  },
});

router.post("/", upload.single("file"), (req, res) => {
  res.status(200).send(`/${req.file.path}`);
});

export default router;
