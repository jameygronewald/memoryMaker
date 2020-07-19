const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
  db.Event.findAll()
    .then(memoryData => {
      console.log(memoryData);
      const memoryArray = memoryData.map(memory => {
        const { id, title, date, description, location, rating } = memory.dataValues;
        const memoryObject = {
          id: id,
          title: title,
          date: date,
          description: description,
          location: location,
          rating: rating
        };
        return memoryObject;
      })
      const memories = {
        memory: memoryArray
      };
      res.render("memories", memories);
    });
});

router.get("/:id", (req, res) => {
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
});



module.exports = router;