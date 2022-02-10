const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.DB_USERS_MODEL);

// require("crypto").randomBytes(16).toString("hex");

const addOne = (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: hash,
    };

    User.create(newUser, function (err, createdUser) {
      const response = {
        status: 201,
        message: createdUser,
      };

      if (err) {
        console.log("Error creating new user", err);
        response.status = 500;
        response.message = err;
      }

      res.status(response.status).json(response.message);
    });
  }
};

const login = (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }).exec(function (err, user) {
      const response = {
        status: 200,
        message: user,
      };

      if (err) {
        console.log("Error creating new user", err);
        response.status = 500;
        response.message = err;
      } else if (!user) {
        console.log("user not found");
        response.status = 401;
        response.message = "Unauthorized";
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            { name: user.name },
            process.env.TOKEN_PASSWORD,
            { expiresIn: 3600 }
          );

          response.message = {
            success: true,
            token,
          };
        } else {
          console.log("password incorrect");
          response.status = 401;
          response.message = "Unauthorized";
        }
      }

      res.status(response.status).json(response.message);
    });
  }
};

const authenticate = function (req, res, next) {
  const authHeader = req.headers && req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const response = {
    status: 200,
    message: {},
  };

  console.log("token", token);

  if (token === null) {
    response.status = 401;
    response.message = { message: "Wrong Token" };
    res.status(response.status).json(response.message);
  } else {
    jwt.verify(token, process.env.TOKEN_PASSWORD, function (err, user) {
      if (err) {
        response.status = 403;
        response.message = { message: "Wrong Token" };
        res.status(response.status).json(response.message);
      } else {
        next();
      }
    });
  }
};

module.exports = { addOne, login, authenticate };
