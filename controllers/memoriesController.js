const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
  db.Event.findAll()
    .then(memoryData => {
      // console.log(memoryData);
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
      console.log(memoryArray);
      const memories = {
        memory: memoryArray
      };
      res.render("memories", memories);
    });
});

module.exports = router;