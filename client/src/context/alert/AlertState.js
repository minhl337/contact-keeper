import React, { useReducer } from "react"
import { v4 as uuid } from "uuid"

import alertContext from "./alertContext"
import alertReducer from "./alertReducer"

import { SET_ALERT, REMOVE_ALERT } from "../types"

const AlertState = (props) => {
  const initialState = []

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid()
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type,
        id,
      },
    })

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    )
  }

  return (
    <alertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState
