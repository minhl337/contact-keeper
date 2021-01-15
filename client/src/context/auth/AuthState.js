import React, { useReducer } from "react"
import axios from "axios"

import authContext from "./authContext"
import authReducer from "./authReducer"

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types"

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // load user
  const loadUser = () => {
    console.log("load user")
  }

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    }

    try {
      const res = await axios.post("/api/users", formData, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  // login user
  const login = () => {
    console.log("login")
  }
  // logout
  const logout = () => {
    console.log("logout")
  }

  // clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }
  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState
