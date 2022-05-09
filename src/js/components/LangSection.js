import React from "react";

class RecentLang extends React.Component
{
    render()
    {
        const{lang,setpreviousLang} = this.props;
        return (<button 
            className="recent-lang"
            onClick={()=>setpreviousLang(lang)}
            >{lang.name}</button>)
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
        const{toggleMenu,actualLang,previousLangs,setpreviousLang} = this.props;
        
        return (
            <div className="lang-choice-section">
                <button onClick={toggleMenu} className="select-lang-btn">
                    <div className="lang-flag">
                        <img src={actualLang.flag} alt="" />
                    </div>
                    <p>{actualLang.name}</p>
                    <span></span>
                </button>
                <RecentLang lang={previousLangs[0]} setpreviousLang={setpreviousLang}/>
                <RecentLang lang={previousLangs[1]} setpreviousLang={setpreviousLang}/>
            </div>
        )
    }
}