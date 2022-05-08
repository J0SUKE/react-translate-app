import React from "react";

export default class LangChoice extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const {imageURL,lang} = this.props;
        return (
            <li>
                <span>
                    <img src={imageURL} alt="" />
                </span>
                <p>{lang}</p>
                </li>    
        )
    }
}