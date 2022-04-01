const express = require("express");
const server = express();
const morgan = require("morgan");
const PORT = 3000 || 3002;
const twig = require("twig");
const routeur = require("./routeur");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
server.set("trust proxy", 1);
mongoose.connect("mongodb://localhost/biblio2");

server
  .use(morgan("dev"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      maxAge: 5000,
    })
  )
  .use("/", routeur);

server.listen(PORT, console.log(`Le serveur ${PORT} fonctionne`));
