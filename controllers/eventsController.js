const express = require("express");
const router = express.Router();
const db = require("../models");

// /api/alerts/
router.post("/", (req, res) => {
  console.log(req.body);
  const{title, date, description, location, category, rating} = req.body;
  let newEvent={
      title: title,
      date:date,
      description:description,
      location:location,
      rating:rating
  }

  db.Category.create({categoryName:category})
    .then((result) => {
      res.json({
        error: false,
        data: result,
        message: "Successfully created new category",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new alert.",
      });
    });
//   db.Image.create(req.body)
//     .then((result) => {
//       res.json({
//         error: false,
//         data: result,
//         message: "Successfully created new alert",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: "Unable to create new alert.",
//       });
//     });
  db.Event.create({
    title: title,
    date:date,
    description:description,
    location:location,
    rating:rating
})
    .then((result) => {
      res.json({
        error: false,
        data: result,
        message: "Successfully created new alert",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new alert.",
      });
    });
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
