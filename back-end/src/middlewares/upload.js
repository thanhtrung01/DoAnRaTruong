const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "to-do-app",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "jpeg"] // supports promises as well
  }
});

exports.productImages = function () {
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload.array("imageProduct", 12);
};
// const path = require('path');
// // const express = require('express');
// const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/uploads/');
//   },
//   filename: function (req, file, cb) {
//     let ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

// module.exports = upload;
