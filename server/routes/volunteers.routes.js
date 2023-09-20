const VolunteersController = require("../controllers/volunteers.controllers")
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    // app.post("/api/users/register", authenticate, UserController.register);
    app.post("/api/volunteers/register", VolunteersController.register);
    app.post("/api/volunteers/login", VolunteersController.login);
    app.post("/api/volunteers/logout", VolunteersController.logout);
    app.get("/api/volunteers/loggedIn", VolunteersController.getLoggedInVolunteer);
    app.post("/admin/login", VolunteersController.adminLogin);
    app.get("/api/volunteers/count", VolunteersController.countVolunteer);
    app.get("api/volunteers/getAll", VolunteersController.readAllVolunteer);
    app.get("api/volunteer/:id", VolunteersController.findOne);
};