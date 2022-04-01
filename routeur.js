const express = require("express");
const routeur = express.Router();
const livreModele = require("./models/models");
const mongoose = require("mongoose");

routeur.get("/", (req, rep) => {
  livreModele
    .find()
    .exec()
    .then((livre) => rep.render("acceuil.html.twig", { livres: livre }));
});
//Afficher les livres
routeur.get("/mesLivres", (req, rep) => {
  livreModele
    .find()
    .exec()
    .then((livre) => rep.render("mes_livres.html.twig", { livres: livre }));
});
//Trouver le bon livre
routeur.get("/mesLivres/ok/:nom", (req, rep) => {
  livreModele
    .findById(req.params.id)
    .exec()
    .then((livre) =>
      rep.render("un_livre.html.twig", { livres: livre, isModification: false })
    );
});
//Ajoutez un livre I
routeur.get("/mesLivres/ajoutez", (req, rep) => {
  livreModele
    .find()
    .exec()
    .then((livre) => rep.render("ajoutez.html.twig", { livres: livre }));
});
//Ajoutez un livre II
routeur.post("/renvoie", (req, rep) => {
  const newLivre = new livreModele({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    auteur: req.body.auteur,
    pages: req.body.pages,
    description: req.body.description,
  });
  newLivre.save().then((resultat) => rep.redirect("/mesLivres"));
});
//Suppression d'un livre
routeur.post("/delete/:id", (req, rep) => {
  livreModele
    .remove({ _id: req.params.id })
    .exec()
    .then((resultat) => rep.redirect("/meslivres"));
});
//Modification
routeur.get("/mesLivres/ok/:id", (req, rep) => {
  livreModele
    .findById(req.params.id)
    .exec()
    .then((livre) =>
      rep.render("un_livre.html.twig", { livres: livre, isModification: true })
    );
});

//FIXME: Variable error à mettre en place
routeur.get((req, rep, suite) => {
  const error = new Error("Erreur de pages ");
  error.status = 404;
  suite();
  console.log(error);
});

// routeur.use((error, req, rep) => {
//   rep.status(error.status || 500);
//   rep.message(error.message);
// });
module.exports = routeur;
