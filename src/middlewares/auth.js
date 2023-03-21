const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NOTESAPI';

const auth = (req, res, next) => {

  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];//token and bearer
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    }
    else {
      return res.status(401).json('Unauthorized User');
    }
    next();
  } catch (error) {
    res.status(401).json("Un-Authorized User");
  }
}

module.exports = auth;