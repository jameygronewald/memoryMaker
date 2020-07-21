const express = require("express");
const router = express.Router();
const db = require("../models");
const { verifyToken } = require("../util/tokenHelper");

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
  try {
    verifyToken(req.cookies.sessionToken);
    res.render("newMemory");
  } catch(error) {
    console.error(error)
    res.status(401).redirect('/');
  }
});

router.get("/newMemory/:id", (req, res) => {
  try {
    verifyToken(req.cookies.sessionToken);
    db.Event.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    }).then((response) => {
      res.render("newMemory", response.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
  } catch(error) {
    console.error(error)
    res.status(401).redirect('/');
  }
});

module.exports = router;
