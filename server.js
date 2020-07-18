const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");
const ViewsController = require("./controllers/viewsController.js");
const APIController = require("./controllers/apiController");
const UsersController = require("./controllers/usersController");
const EventsController = require("./controllers/eventsController");


// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.static("public"));

// Routes
app.use(ViewsController);
app.use(APIController);
app.use("/users", UsersController);
app.use("/api/newMemory", EventsController);



db.sequelize
    .sync()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database.");
    console.log(err);
  });
