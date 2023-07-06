const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "kosu is a bad boy";

// Route 1: Create a user
router.post('/createuser', [
  body('name', "Enter a valid username").isLength({ min: 3 }),
  body('password', "Password cannot be blank").exists(),
  body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(),success });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    return res.json({ message: "User successfully created", authToken ,success});
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error:'Internal Server Error',success});
  }
});

// Route 2: Login user
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false;
      return res.status(400).json({ error: "User with this email does not exist",success});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({ error: "Please login with correct credentials" ,success});
    }

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    return res.json({ message: "User logged in successfully", authToken,success });
  } catch (error) {
    console.error(error.message);
    return res.status(401).send('Internal Server Error');
  }
});

// authtoken to use : "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMDIzMDUwZjIwNWM2NDI3NDhhMmY3In0sImlhdCI6MTY4ODIxNjMyNn0.66bLU2Bt_uwOQEnPZsBt2qB4Er0dCF0QkraoY4EEZls"

// Route 3: Get details of logged-in user
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
