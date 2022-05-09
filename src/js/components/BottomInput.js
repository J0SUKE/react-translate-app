import React from "react";

export default class BottomInput extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const{translateText,value,detected} = this.props;
        
        return(
            <div className="translate-btn-section">
                {
                    detected==null ? 
                    <div></div>:
                    <p>Your Language is : <span>{detected.name}</span></p>
                }
                
                <button onClick={()=>{translateText(value)}}>
                    <img src="./images/arrow-right.svg" alt="" />
                </button>
            </div>
        )
    }
}