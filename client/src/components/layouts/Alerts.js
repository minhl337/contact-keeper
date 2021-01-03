import React from "react"
import alertContext from "../../context/alert/alertContext"

const Alerts = () => {
  const AlertContext = React.useContext(alertContext)

  return (
    AlertContext.alerts.length > 0 &&
    AlertContext.alerts.map((alert) => {
      return (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
          style={{ textAlign: "center" }}
        >
          <i className="fas fa-info-circle"></i> {alert.msg}
        </div>
      )
    })
  )
}

export default Alerts
