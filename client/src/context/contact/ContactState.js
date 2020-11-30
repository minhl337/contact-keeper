import React, { useReducer } from "react"
import { v4 as uuid } from "uuid"

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
        name: "panda",
        email: "aa@aa.com",
        phone: "11",
        type: "professional",
      },
      {
        id: 2,
        name: "bb",
        email: "bb@panda.com",
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
      {
        id: 4,
        name: "bb",
        email: "a@cc.com",
        phone: "33",
        type: "professional",
      },
    ],
    current: null,
    filtered: [],
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)
  //add contact
  const addContact = (contact) => {
    contact.id = uuid()
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    })
  }

  //delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    })
  }

  //set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    })
  }

  //clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    })
  }

  //update contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    })
  }

  //filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    })
  }

  //clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    })
  }

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  )
}

export default ContactState
