const express = require("express")
const { check, validationResult } = require("express-validator")

const User = require("../models/User")
const Contact = require("../models/Contact")
const auth = require("../middleware/auth")

const router = express.Router()

// @route GET /api/contacts
// @desc get all user's contacts
// @access PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    })
    res.json(contacts)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
  }
})

// @route POST /api/contacts
// @desc add new contact
// @access PRIVATE
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() })
    }
    const { name, email, phone, type } = req.body
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      })

      const contact = await newContact.save()
      res.json(contact)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route PUT /api/contacts/:id
// @desc update contact
// @access PRIVATE
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  //build contact object
  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact)
      return res.status(404).json({ errors: [{ msg: "Contact not found" }] })

    //make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    )

    res.json(contact)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// @route DELETE /api/contacts/:id
// @desc delete contact
// @access PRIVATE
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact)
      return res.status(404).json({ errors: [{ msg: "Contact not found" }] })

    //make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json("Contact removed")
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

module.exports = router
