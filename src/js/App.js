import React from "react";
import LangSection from "./components/LangSection.js";
import LangMenu from "./components/langMenu/LangMenu.js";
import languages from "./data/languages.js";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            inputLangMenu:false,
            outputLangMenu:false,
            inputLang:"English (United States)",
            outputLang:"German"
        }

        console.log(this.getLanguagesList());

    }
    render()
    {
        return <div className="pageContent" onClick={this.closeMenus.bind(this)}>
                <div className="main-content">
                    <div className="input-area">
                        <div className="lang-section">
                            <LangSection 
                                toggleMenu={this.toggleInputLangMenu.bind(this)}
                                actualLang={this.state.inputLang}
                                />
                            {this.state.inputLangMenu ? <LangMenu/> : null}
                        </div>
                        <textarea name="user-input" placeholder="Enter a text"></textarea>
                    </div>
                    <div className="translate-area">
                        <div className="lang-section">
                                <LangSection 
                                    toggleMenu={this.toggleOutputLangMenu.bind(this)}
                                    actualLang={this.state.outputLang}
                                    />
                                {this.state.outputLangMenu ? <LangMenu/> : null}
                        </div>
                        <div name="translation"  placeholder="translation"></div>
                    </div>
                </div>
            </div>
        }

    toggleInputLangMenu(e)
    {
        e.stopPropagation();
        this.setState((state)=>({
            inputLangMenu:!state.inputLangMenu,
            outputLangMenu:false
        }))
    }
    
    toggleOutputLangMenu(e)
    {
        e.stopPropagation();
        this.setState((state)=>({
            outputLangMenu:!state.outputLangMenu,
            inputLangMenu:false
        }))
    }
    closeMenus(e)
    {
        e.stopPropagation();
        this.setState({
            inputLangMenu:false,
            outputLangMenu:false
        })    
        
    }


    getLanguagesList()
    {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'Accept-Encoding': 'application/gzip',
        //         'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        //         'X-RapidAPI-Key': 'f2eb276479mshe2588f6254e9b51p1ef845jsn0e64a991a846'
        //     }
        // };
        
        // fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));

        return languages;
    }

}