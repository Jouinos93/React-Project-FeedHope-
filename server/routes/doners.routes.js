const DonersController = require("../controllers/doners.controllers")
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    // app.post("/api/users/register", authenticate, UserController.register);
    app.post("/api/doners/register", DonersController.register);
    app.post("/api/doners/login", DonersController.login);
    app.post("/api/doners/logout", DonersController.logout);
    app.get('/api/doners/loggedIn',DonersController.getLoggedInDoner);
    app.get('/api/doners/getAll',DonersController.readAllDoner);
    app.get("/api/doners/count", DonersController.countDoner);
    app.get("/api/doner/:id", DonersController.findOne);

};