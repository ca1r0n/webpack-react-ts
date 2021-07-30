import React, { useState } from "react"

import global from "../../scss/main.scss"
import style from "./style.scss"

import deleteImg from "../../img/delete.png"

import type { IItem } from "./ToDo"
import sortTodoList from "./ToDo"

let diff = 0

function Item(props: IItem) {

    function checkImportanceAndTakeStyle(importance: string) {
        switch (importance) {
            case "Minor":
                return style.minor
            case "Normal":
                return style.normal
            case "Critical":
                return style.critical
        }
    }
    function removeDoFromHTML(id: string) {
        let elem = document.getElementById(id) as HTMLElement
        if (elem) {
            elem.style.display = "none"
        }
    }

    function removeDoFromLocaleStorage(id: string) {
        let OldStorage = JSON.parse(localStorage.getItem("List")!)
        if (OldStorage != null) {
            OldStorage.splice(String(+id - diff ), 1)
            ++diff
            localStorage.setItem("List", JSON.stringify(OldStorage))
        }
    }
    return (
        <div className={style.item} id={props.id}>
            <div className={style.name}>
                <p className={style.nameText}>{props.name}</p>
            </div>

            <div className={checkImportanceAndTakeStyle(props.importance)}>
                <p>{props.importance}</p>
            </div>

            <div className={style.delete}>
                <img
                    onClick={() => {
                        removeDoFromHTML(props.id)
                        removeDoFromLocaleStorage(props.id)
                    }}
                    className={style.deleteImg}
                    src={deleteImg}
                    alt="delete"
                />
            </div>
        </div>
    )
}

export default Item
