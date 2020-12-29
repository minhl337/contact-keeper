// TODO: Add checks to make sure fields arent blank/ may already be in backend logic
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
  const { name, email, phone, type } = contact

  React.useEffect(() => {
    ContactContext.current
      ? setContact(ContactContext.current)
      : setContact({
          name: "",
          email: "",
          phone: "",
          type: "personal",
        })
  }, [ContactContext])

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    ContactContext.current
      ? ContactContext.updateContact(contact)
      : ContactContext.addContact(contact)

    clearAll()
  }

  const clearAll = () => {
    ContactContext.clearCurrent()
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>{ContactContext.current ? "Edit" : "Add"} Contact</h2>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            {ContactContext.current ? "Update " : "Add "} Contact
          </button>
        </div>

        <div>
          {ContactContext.current && (
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
