const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/books')
  },
  filename(req, file, cb) {
    console.log(file, 'file')
    if (req.query.id) {
      const fileNameDivided = file.originalname.split('.')
      const extension = fileNameDivided[fileNameDivided.length - 1]
      cb(null, `book-${req.query.id}.${extension}`)
    } else {
      cb(null, `book-${new Date().toISOString().replace(/:/g, '-')}.${extension}`)
    }
  }
});

const allowedTypes = ['text/plain', 'application/pdf', 'application/octet-stream', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage,
  fileFilter
});