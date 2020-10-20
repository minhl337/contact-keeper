import React from "react"
import contactContext from "../../context/contact/contactContext"

const ContactForm = () => {
  const ContactContext = React.useContext(contactContext)

  const [contact, setContact] = React.useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  })

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })
    console.log(contact)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    ContactContext.addContact(contact)
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    })
  }
  const { name, email, phone, type } = contact
  return (
    <form onSubmit={onSubmit}>
      <h2>Add Contact</h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="name"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="email"
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="phone"
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
          />
          Personal
        </div>
        <div>
          <input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
          />
          Professional
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  )
}

export default ContactForm
