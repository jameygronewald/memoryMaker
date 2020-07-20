const express = require("express");
const router = express.Router();
const db = require("../models");
const { verifyToken } = require('../util/tokenHelper');

router.get("/id/:id", (req, res) => {
  // try {
  //   verifyToken(req.cookies.sessionToken);
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(memoryData => {
        const { id, title, date, description, location, rating } = memoryData.dataValues;
        const memoryObject = {
          id: id,
          title: title,
          date: date,
          description: description,
          location: location,
          rating: rating
        };
        memoryArray = [];
        memoryArray.push(memoryObject);
        const selectedMemory = {
          memory: memoryArray
        };
        res.render("memory", selectedMemory);
      });
    // } catch(error) {
    //   console.error(error)
    //   res.status(401).redirect('/');
    // }
});

router.get("/", (req, res) => {
  try {
    const decodedToken = verifyToken(req.cookies.sessionToken);
    db.Event.findAll({
      where: {
        UserUsername: decodedToken.data
      },
      include: [
        {
          model: db.Image,
        }
      ]
    })
      .then(memoryData => {
        const memoryArray = memoryData.map(memory => {
          const { id, title, date, description, location, rating, UserUsername, Images} = memory.dataValues;
          const memoryObject = {
            id: id,
            title: title,
            date: date,
            description: description,
            location: location,
            rating: rating,
            username: UserUsername,
            imageArray: Images[0] ? Images[0].dataValues.url : ''
          };
          return memoryObject;
        })
        console.log(memoryArray);
        const memories = {
          memory: memoryArray
        };
        res.render("memories", memories);
      });
  } catch(error) {
    console.error(error)
    res.status(401).redirect('/');
  }
});

module.exports = router;