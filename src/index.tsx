import React from "react"
const ReactDOM = require("react-dom")

import global from "./scss/main.scss"

import App from './Components/App' 

ReactDOM.render(
    <div className={global.siteContainer}>
        <App />
    </div>,
    document.getElementById("root")
)
    