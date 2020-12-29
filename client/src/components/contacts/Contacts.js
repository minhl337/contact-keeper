import React, { useContext } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import ContactItem from "./ContactItem"

import contactContext from "../../context/contact/contactContext"

const Contacts = () => {
  const ContactContext = useContext(contactContext)

  const { contacts } = ContactContext

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>
  }

  return (
    <>
      <TransitionGroup>
        {ContactContext.filtered.length > 0
          ? ContactContext.filtered.map((contact) => (
              <CSSTransition
                key={contact.item.id}
                timeout={500}
                classNames="item"
              >
                <ContactItem contact={contact.item} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </>
  )
}

export default Contacts
