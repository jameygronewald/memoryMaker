const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
    res.render("index");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/memories/newMemory", (req, res) => {
    db.Event.findOne({
        where: {
          id: parseInt(req.params.id),
        },
      })
        .then((response) => {
          console.log(response.dataValues);
    
          const {
            id,
            title,
            date,
            description,
            location,
            rating,
          } = response.dataValues;
          console.log({ title: title });
    
          res.render("newMemory",  {description} );
        })
        .catch((err) => {
          console.log(err);
        });
    res.render("newMemory");
});

router.get("/newMemory/:id", (req, res) => {
    console.log(req.body);

  db.Event.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  })
    .then((response) => {
      console.log(response.dataValues);

      const {
        id,
        title,
        date,
        description,
        location,
        rating,
      } = response.dataValues;
      console.log(response.dataValues);

      res.render("newMemory",  response.dataValues );
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;