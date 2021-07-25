import React from "react"

import global from "../scss/main.scss"
import style from "./Test.scss"

export default function Test() {
    return (
        <div>
            <div className={global.test2}>123</div>
            <div className={style.red}>321</div>
        </div>
    )
}
