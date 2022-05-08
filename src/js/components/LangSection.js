import React from "react";

export default class LangSection extends React.Component
{
    constructor(props)
    {
        super(props);
        this.getFlag("uk");
    }
    render()
    {
        const{toggleMenu,actualLang} = this.props;
        
        return (
            <div className="lang-choice-section">
                <button onClick={toggleMenu} className="select-lang-btn">
                    <div className="lang-flag">
                    </div>
                    <p>{actualLang}</p>
                    <span></span>
                </button>
                <button className="recent-lang">English (United states)</button>
                <button className="recent-lang">Italian</button>
            </div>
        )
    }


    getFlag(lang)
    {
        //fetch(`https://restcountries.com/v3.1/alpha/${lang}`)
        fetch(`https://restcountries.com/v3.1/lang/${lang}`)
        .then(resp=>resp.json())
        .then(data=>console.log(data));
    }
}