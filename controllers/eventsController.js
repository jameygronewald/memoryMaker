const express = require("express");
const multiparty = require("multiparty");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const db = require("../models");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// /api/alerts/
router.post("/", async (req, res) => {
  console.log(req.body);
  const form = new multiparty.Form();

  const successHandler = (result) => {
    console.log(result);
    res.json({
      error: false,
      data: result,
      message: "Successfully created new category",
    });
  };

  const errorHandler = (err) => {
    console.log(err);
    res.status(500).json({
      error: true,
      data: null,
      message: "Unable to create new alert.",
    });
  };

  const formData = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      resolve({ fields: fields, files: files });
    });
  }).catch(errorHandler);

  const fields = Object.keys(formData.fields).reduce((acc, field) => {
    return { ...acc, [field]: formData.fields[field][0] };
  }, {});
  const { category: categoryName, ...eventData } = fields;

  console.log("formData!!!!", formData.files);

  const category = await db.Category.create({ categoryName }).catch(
    errorHandler
  );
  const event = await db.Event.create({
    title: eventData.title,
    date: eventData.date,
    description: eventData.description,
    location: eventData.location,
    rating: eventData.rating,
    CategoryId: category.id,
  }).catch(errorHandler);

  console.log(event);

  const uploadFilesRequests = formData.files["file[]"].map(
    (file) =>
      new Promise((resolve, reject) => {
        const { path, originalFilename } = file;

        cloudinary.uploader.upload(
          path,
          {}, // directory and tags are optional
          async (err, image) => {
            if (err) return reject(err);
            console.log("file uploaded to Cloudinary", image);
            await db.Image.create({
              url: image.url,
              name: originalFilename,
              eventId: event.id,
            });
            resolve(image);
          }
        );
      })
  );

  await Promise.all(uploadFilesRequests);
});

// /api/alerts/:id
router.put("/:id", (req, res) => {
  res.json({
    message: "Put route",
  });
});

// /api/alerts/:id
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
