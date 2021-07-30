import React, { FormEventHandler, useState } from "react"
import Item from "./Item"

import global from "../../scss/main.scss"
import style from "./style.scss"

import plusAdd from "../../img/plus-add.svg"
import lupa from "../../img/lupa.svg"

type TEventData = {
    name: { value: string }
    importance: { value: string }
}
interface IItem {
    name: string
    importance: string
    id: string
}

export default function ToDo() {
    const [TodoList, setTodoList] = useState<Array<IItem>>(
        getDoFromLocalStorage()
    )

    function Form() {
        function onSubmitHandler(event: React.SyntheticEvent) {
            event.preventDefault()
            const target = event.target as typeof event.target & TEventData
            const name = target.name.value
            const importance = target.importance.value
            const NewItem: IItem = {
                name: name,
                importance: importance,
                id: String(TodoList.length),
            }
            setTodoList([NewItem, ...TodoList])
            getNewDoInLocalStorage(NewItem)
        }

        return (
            <form onSubmit={onSubmitHandler} className={style.form}>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Введите имя дела"
                    name="name"
                ></input>
                <img className={style.lupa} src={lupa} alt="lupa" />

                <select
                    className={style.select}
                    name="importance"
                    id="importance"
                >
                    <option value="Minor">Minor</option>
                    <option value="Critical">Critical</option>
                    <option value="Normal">Normal</option>
                </select>

                <button className={style.btn}>
                    <img className={style.img} src={plusAdd} alt="Plus" />
                    <p className={style.btnText}>Добавить новое дело</p>
                </button>
            </form>
        )
    }

    return (
        <div className={global.container}>
            <Form />

            {sortTodoList(TodoList).map((item, index) => {
                return (
                    <Item
                        name={item.name}
                        importance={item.importance}
                        key={index}
                        id={String(index)}
                    />
                )
            })}
        </div>
    )
}

function sortTodoList(List: Array<IItem>): Array<IItem> {
    return List.sort((a: IItem, b: IItem) => {
        if (a.importance == b.importance) {
            return 0
        } else if (a.importance == "Minor") {
            return 1
        } else if (b.importance == "Minor") {
            return -1
        } else if (a.importance == "Normal") {
            return 1
        } else {
            return -1
        }
    })
}

function getNewDoInLocalStorage(Item: IItem) {
    let OldStorage = localStorage.getItem("List")
    if (OldStorage != null) {
        localStorage.setItem(
            "List",
            JSON.stringify(sortTodoList([...JSON.parse(OldStorage), Item]))
        )
    } else {
        localStorage.setItem("List", JSON.stringify([Item]))
    }
}
function getDoFromLocalStorage() {
    let OldStorage = localStorage.getItem("List")
    if (OldStorage != null) {
        return eval(JSON.parse(OldStorage))
    } else {
        return []
    }
}

export type { IItem }
export { sortTodoList }
