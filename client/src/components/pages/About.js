import React from "react"
import { version } from "../../../package.json"

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className="my-1">This is a full stack react for keeping contacts.</p>
      <p className="bg-dark p">
        <strong>Version: </strong>
        {version}
      </p>
    </div>
  )
}

export default About
