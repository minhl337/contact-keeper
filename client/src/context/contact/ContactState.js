import React, { useReducer } from "react"
import uuid from "uuid"

import contactContext from "./contactContext"
import contactReducer from "./contactReducer"

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types"

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "aa",
        email: "aa@aa.com",
        phone: "11",
        type: "professional",
      },
      {
        id: 2,
        name: "bb",
        email: "bb@bb.com",
        phone: "22",
        type: "personal",
      },
      {
        id: 3,
        name: "cc",
        email: "cc@cc.com",
        phone: "33",
        type: "professional",
      },
    ],
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)
  //add contact

  //delete contact

  //set current contact

  //clear current contact

  //update contact

  //filter contacts

  //claer filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  )
}

export default ContactState
