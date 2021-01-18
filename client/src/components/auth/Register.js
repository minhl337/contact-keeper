import React from "react"
import alertContext from "../../context/alert/alertContext"
import authContext from "../../context/auth/authContext"

const Register = (props) => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const AlertContext = React.useContext(alertContext)
  const AuthContext = React.useContext(authContext)
  console.log(AuthContext)
  React.useEffect(() => {
    if (AuthContext.isAuthenticated) {
      props.history.push("/")
    }
    if (AuthContext.error) {
      AlertContext.setAlert(AuthContext.error, "danger")
      AuthContext.clearErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthContext.error, AuthContext.isAuthenticated])

  const { name, email, password, password2 } = user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === "" || email === "" || password === "") {
      AlertContext.setAlert("All fields required", "danger")
    } else if (password !== password2) {
      AlertContext.setAlert("Passwords do not match", "danger")
    } else {
      AuthContext.register({
        name,
        email,
        password,
      })
    }
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}

export default Register
