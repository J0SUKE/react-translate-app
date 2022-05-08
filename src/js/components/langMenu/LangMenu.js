import React from "react";
import LangChoice from "./langChoice.js";
export default class LangMenu extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <menu className="select-lang-menu">
                <form action="">
                    <input type="text" placeholder="Search here..."/>
                </form>
                <ul>
                    <LangChoice imageURL={"./images/Auto.svg"} lang={"Detect Language"}/>
                    <LangChoice imageURL={"./images/usa.png"} lang={"English (United States)"}/>
                </ul>
            </menu>
        )
    }
}