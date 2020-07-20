const express = require("express");
const router = express.Router();
const db = require("../models");
const { generateToken, verifyToken } = require('../util/tokenHelper');

router.post('/login', (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password, 
    }
  }).then(data => {
    if (data === null) {
      throw error;
    }
    res.status(200).send(generateToken(data.dataValues.username));
  }).catch(error => {
    console.error(error);
    res.status(500).send('Incorrect login')
  })
})

router.post("/signup", (req, res) => {
  db.User.create(req.body)
    .then(result => {
      res.json({
        error: false,
        data: result,
        message: "Successfully created new user",
      });
    })
    .catch((err) => {
      console.log("error occured", err);
      res.status(500).json({
        error: err.errors,
        data: null,
        message: "Unable to create new user.",
      });
    });
});

// /api/users/:id
// router.put("/:id", (req, res) => {
//   res.json({
//     message: "Put route",
//   });
// });

// // /api/users/:id
// router.delete("/:id", (req, res) => {
//   res.json({
//     message: "Delete route",
//   });
// });

module.exports = router;
