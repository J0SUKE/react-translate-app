import React from "react"
export default class SwitchLang extends React.Component
{
    render()
    {
        const{SwitchLanguage} = this.props;

        return <button className="switch-btn" onClick={SwitchLanguage}>
            <img src="./images/icon-switch.svg" alt="" />
        </button>
    }
}