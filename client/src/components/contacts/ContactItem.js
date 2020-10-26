import React from "react"
import PropTypes from "prop-types"

import contactContext from "../../context/contact/contactContext"

const ContactItem = ({ contact }) => {
  const { name, id, email, phone, type } = contact

  const ContactContext = React.useContext(contactContext)

  const onDelete = () => {
    ContactContext.deleteContact(id)
    contact.id === ContactContext.current.id && ContactContext.clearCurrent()
  }

  return (
    <div className="card bg-light ">
      <h3
        className="text-primary text-left"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {name}{" "}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => ContactContext.setCurrent(contact)}
      >
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
