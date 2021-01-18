const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../models/User")

// @route POST /api/users
// @desc Register a user
// @access PUBLIC
router.post(
  "/",
  [
    check("name", "Name is required").not().notEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() })
    }
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).send({ msg: "Email in use" })
      }
      user = new User({
        name,
        email,
        password,
      })

      const salt = await bcrypt.genSalt()

      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
