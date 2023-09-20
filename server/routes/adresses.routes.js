const AdressesController = require("../controllers/adresses.controllers");

module.exports = (app) =>{
    app.get("/api/adresses", AdressesController.readAll);
    app.post("/api/adresses", AdressesController.create);
    app.post("/api/adresses/:id", AdressesController.push);
    app.delete("/api/adresses/:id", AdressesController.delete);
}