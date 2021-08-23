import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});

const upload = multer({ storage });

export default () => {
  const router = Router();
  router.post('/', upload.any(), async (req, res) => {
    //@ts-ignore
    res.send(req.files.map((file) => file.path));
  });
  return router;
};