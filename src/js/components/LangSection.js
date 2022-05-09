import React from "react";

class RecentLang extends React.Component
{
    render()
    {
        const{lang} = this.props;
        return (<button className="recent-lang">{lang}</button>)
    }
}


export default class LangSection extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const{toggleMenu,actualLang,previousLangs} = this.props;
        
        return (
            <div className="lang-choice-section">
                <button onClick={toggleMenu} className="select-lang-btn">
                    <div className="lang-flag">
                        <img src={actualLang.flag} alt="" />
                    </div>
                    <p>{actualLang.name}</p>
                    <span></span>
                </button>
                <RecentLang lang={previousLangs[0].name}/>
                <RecentLang lang={previousLangs[1].name}/>
            </div>
        )
    }
}