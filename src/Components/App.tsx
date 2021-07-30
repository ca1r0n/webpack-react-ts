import React from "react"

import global from "../scss/main.scss"
import style from "./style.scss"

import Header from "./Header/Header"
import ToDo from "./ToDo/ToDo"

export default function App() {
    return (
        <>
            {/* <Header /> */}
            <ToDo />
        </>
    )
}
