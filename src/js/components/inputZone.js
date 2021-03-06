import React from "react";

export default class InputZone extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const{value,updateValue,translateText} = this.props;
        return (
            <textarea 
                    name="user-input" 
                    placeholder="Enter a text"
                    value={value}
                    onInput={(e)=>{
                        updateValue(e);
                        translateText(value)
                    }}
                    spellCheck="false"
                    ></textarea>
        )
    }
}