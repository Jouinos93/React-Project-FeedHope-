const GivenFoodController = require("../controllers/givenFood.controllers");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) =>{
    app.post("/api/givenFood", GivenFoodController.create);
    app.get("/api/givenFood/:id", GivenFoodController.findOne);
    app.get("/api/givenFood/:id/oneDoner", GivenFoodController.getAllForDoner);
    app.get("/api/givenFood/count", GivenFoodController.countGivenFood);
    app.get("/api/givenFood", GivenFoodController.getAll);
    app.post("/api/givenFood/:id", GivenFoodController.push);
    app.delete("/api/givenFood/:id", GivenFoodController.delete);
    app.put("/api/givenFood/pickup/:fid", authenticate, GivenFoodController.pickup);
    app.put("/api/givenFood/pickedup/:fid", GivenFoodController.pickedup);
    app.get("/api/givenFood/success/:id", GivenFoodController.successGiven)
}