const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/userModel");

const register = async (req, res) => {
  console.log("inside register");
  const { username, password } = req.body;
  console.log(username);
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).send("Error registering user");
      }
      res.status(200).send({ message: "User registered successfully" });
    }
  );
};

const login = async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) {
      return res.status(404).send("User not found");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: 86400,
    });
    res.status(200).send({ auth: true, token });
  });
};

// Export the functions using CommonJS
module.exports = { register, login };
