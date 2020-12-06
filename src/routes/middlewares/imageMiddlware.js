import multer from 'multer';

const fileSize = 10000000;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize
  }
});

export default upload.single('image');
