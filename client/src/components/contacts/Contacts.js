import React, { useContext } from "react"

import ContactItem from "./ContactItem"

import contactContext from "../../context/contact/contactContext"
import ContactFilter from "./ContactFilter"

const Contacts = () => {
  const ContactContext = useContext(contactContext)

  const { contacts } = ContactContext

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>
  }

  return (
    <>
      {ContactContext.filtered.length > 0
        ? ContactContext.filtered.map((contact) => (
            <ContactItem contact={contact.item} key={contact.item.id} />
          ))
        : contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </>
  )
}

export default Contacts
