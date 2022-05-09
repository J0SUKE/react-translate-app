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
                    onInput={updateValue}
                    spellCheck="false"
                    onKeyUp={(e)=>{
                        if (e.key=="Enter") {
                            translateText(value);
                        }
                    }}
                    ></textarea>
        )
    }
}