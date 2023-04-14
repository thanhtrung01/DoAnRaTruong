const multer = require('multer');
const cloudiness = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudiness.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudiness,
  params: {
    folder: 'to-do-app',
    allowed_formats: ['png', 'jpeg', 'jpg', 'gif', 'jpeg'], // supports promises as well
  },
});

exports.Avatar = function () {
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload.array('avatar', 12);
};

exports.Image = function () {
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload.array('images', 12);
};