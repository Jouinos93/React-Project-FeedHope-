const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.volunteerToken, process.env.SECRET, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}