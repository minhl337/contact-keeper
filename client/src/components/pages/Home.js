import React from "react"

import Contacts from "../contacts/Contacts"
import ContactForm from "../contacts/ContactForm"
import ContactFilter from "../contacts/ContactFilter"

import authContext from "../../context/auth/authContext"

const Home = () => {
  const AuthContext = React.useContext(authContext)

  React.useEffect(() => {
    AuthContext.loadUser()
  })
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
