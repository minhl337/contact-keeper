import React from "react"
import contactContext from "../../context/contact/contactContext"

const ContactFilter = () => {
  const ContactContext = React.useContext(contactContext)

  const text = React.useRef("")
  const handleChange = (e) => {
    text.current !== ""
      ? ContactContext.filterContacts(e.target.value)
      : ContactContext.clearFilter()
  }

  return (
    <form action="">
      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts..."
        onChange={handleChange}
      />
    </form>
  )
}

export default ContactFilter
