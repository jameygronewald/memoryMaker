const express = require("express");
const multiparty = require("multiparty");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const db = require("../models");
const { verifyToken } = require("../util/tokenHelper");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  const verifiedToken = await verifyToken(req.cookies.sessionToken);

  const event = await db.Event.create({
    title: eventData.title,
    date: eventData.date,
    description: eventData.description,
    location: eventData.location,
    rating: eventData.rating,
    CategoryId: category.id,
    UserUsername: verifiedToken.data,
  }).catch(errorHandler);

  console.log(event);

  try {
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
  } catch (error) {
    console.error("Unable to upload image.");
  }
  res.status(200).send(event);
});

router.put("/:id", (req, res) => {
  console.log(req.body);

  db.Event.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  })
    .then((response) => {
      console.log(response.dataValues.title);

      const {
        id,
        title,
        date,
        description,
        location,
        rating,
      } = response.dataValues;
      console.log({ title: title });

      res.render("newMemory", { title: title });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
