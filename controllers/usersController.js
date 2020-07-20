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
      throw new Error('username or password is incorrect');
    }
    res.status(200).send(generateToken(data.dataValues.username));
  }).catch(error => {
    res.status(500).json(error.message);
  })
})

router.post("/signup", (req, res) => {
  db.User.create(req.body)
    .then(result => {
      res.status(200).send(generateToken(result.dataValues.username));
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
