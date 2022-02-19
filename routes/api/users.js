const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST api/user
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = request.body;

    try {
      // Check User Exists
      let user = await User.findOne({ email });

      if (user) {
        console.log(user);
        return response.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Server Error");
    }
  }
);

router.put("/update-user", async (request, response) => {
  const { name, confirmPass, email } = request.body;
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (confirmPass) userFields.password = confirmPass;

  console.log(userFields);
  try {
    let user = await User.findOne({ email: email });
    // console.log;

    if (user) {
      if (user.email !== email) {
        return response.status(401).json({
          msg: "User is not authorised",
        });
      }

      const salt = await bcrypt.genSalt(10);

      userFields.password = await bcrypt.hash(confirmPass, salt);

      user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: userFields,
        },
        {
          new: true,
        }
      );

      console.log(user);
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } else {
      return response.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
});

module.exports = router;
