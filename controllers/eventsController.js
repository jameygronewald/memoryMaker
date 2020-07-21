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
  const verifiedToken = await verifyToken(req.cookies.sessionToken);
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
    UserUsername: verifiedToken.data,
  }).catch(errorHandler);
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
              console.log("file uploaded to Cloudinary");
              await db.Image.create({
                url: image.url,
                name: originalFilename,
                EventId: event.dataValues.id,
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
  try {
    verifyToken(req.cookies.sessionToken);
    db.Event.update({
      title: req.body.title,
      date: req.body.date,
      description:req.body.description,
      location: req.body.location,
      rating: req.body.rating,
      CategoryId: req.body.id
    },
    {
      where: {
        id: parseInt(req.params.id),
      },
    })
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(error) {
    console.error(error)
    res.status(401).redirect('/');
  } 
});

module.exports = router;
