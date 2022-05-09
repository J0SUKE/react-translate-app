import React from "react";
import LangSection from "./components/LangSection.js";
import LangMenu from "./components/langMenu/LangMenu.js";
import InputZone from "./components/inputZone.js";
import languages from "./data/languages.js"
import SwitchLang from "./components/SwitchLang.js";
import BottomInput from "./components/BottomInput.js";
import {HTMLdecode} from "./utils/jsUtils.js";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            inputLangMenu:false,
            outputLangMenu:false,
            inputLang:{name:"English",language:"en",flag: "https://flagcdn.com/us.svg"},
            outputLang:{name:"French",language:"fr",flag: "https://flagcdn.com/fr.svg"},
            previousInputLangs:[
                {language: "es",name: "Spanish",flag: "https://flagcdn.com/es.svg"},
                {language: "it",name: "Italian",flag: "https://flagcdn.com/it.svg"}],
            previousOutputLangs:[
                {language: "es",name: "Spanish",flag: "https://flagcdn.com/es.svg"},
                {language: "it",name: "Italian",flag: "https://flagcdn.com/it.svg"}],
            value:"",
            translated:"",
            filterdLangs:[],
            searchBarValue:"",
            detected:null
        }
        this.languages=languages;
    
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
                                previousLangs={this.state.previousInputLangs}
                                setpreviousLang={this.setPreviousInputLang.bind(this)}
                            />
                            {
                                this.state.inputLangMenu ? 
                                    <LangMenu 
                                        languages={[{name:"Detect Language",flag:"./images/Auto.svg"},...this.languages]}
                                        setLang={this.setInputLang.bind(this)}
                                        SearchBarValue={this.state.searchBarValue}
                                        filterSearchBarLanguages={this.filterSearchBarLanguages.bind(this)}
                                        filterdLangs={this.state.filterdLangs}
                                    /> : 
                                    null
                            }
                            <SwitchLang SwitchLanguage={this.SwitchLanguage.bind(this)}/>
                        </div>
                        <InputZone
                            value={this.state.value}
                            updateValue={this.handleTextInput.bind(this)}
                            translateText={this.translateText.bind(this)}
                            />
                        <BottomInput 
                            translateText={this.translateText.bind(this)}
                            value={this.state.value}
                            detected={this.state.detected}
                            />
                    </div>
                    <div className="translate-area">
                        <div className="lang-section">
                                <LangSection 
                                    toggleMenu={this.toggleOutputLangMenu.bind(this)}
                                    actualLang={this.state.outputLang}
                                    previousLangs={this.state.previousOutputLangs}
                                    setpreviousLang={this.setPreviousOutputLang.bind(this)}
                                    />
                                {this.state.outputLangMenu ? 
                                    <LangMenu 
                                        languages={this.languages}
                                        setLang={this.setOutputLang.bind(this)}
                                        filterSearchBarLanguages={this.filterSearchBarLanguages.bind(this)}
                                        SearchBarValue={this.state.searchBarValue}
                                        filterdLangs={this.state.filterdLangs}
                                        /> : null}
                        </div>
                        <div className="translation">
                            {this.state.translated==""? "translation": this.state.translated}
                        </div>
                    </div>
                </div>
            </div>
        }

    toggleInputLangMenu(e)
    {
        e.stopPropagation();
        this.setState((state)=>({
            inputLangMenu:!state.inputLangMenu,
            outputLangMenu:false,
            searchBarValue:""
        }))
    }
    
    toggleOutputLangMenu(e)
    {
        e.stopPropagation();
        this.setState((state)=>({
            outputLangMenu:!state.outputLangMenu,
            inputLangMenu:false,
            searchBarValue:""
        }))
    }
    closeMenus(e)
    {
        e.stopPropagation();
        this.setState({
            inputLangMenu:false,
            outputLangMenu:false,
            searchBarValue:""
        })    
        
    }

    setInputLang(lang)
    {
        this.setState({
            inputLang:lang,
            detected:null
        })
    }
    setOutputLang(lang)
    {
        this.setState({
            outputLang:lang  
        })
    }

    handleTextInput(e)
    {
        this.setState({
            value:e.target.value
        })
    }

    translateText(input)
    {
        if (input=="")
        {
            this.setState({
                translated:""
            })
            return;
        };


        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': 'f2eb276479mshe2588f6254e9b51p1ef845jsn0e64a991a846'
            },
        };

        const encodedParams = new URLSearchParams();
        encodedParams.append("q", input);

        if (this.state.inputLang.name=="Detect Language" ) 
        {
            options.body = encodedParams;
            
            fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)
            .then(response => response.json())
            .then(response => response.data.detections[0][0])
            .then(response => this.detectLang(response))
            .catch(err => console.error(err));      
            
        }
        else
        {
            encodedParams.append("target", this.state.outputLang.language);
            encodedParams.append("source", this.state.inputLang.language);

            options.body = encodedParams;

            fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
            .then(response => response.json())
            .then(response=>response.data.translations[0].translatedText)
            .then((response)=>{
                this.setState({
                    translated:HTMLdecode(response)
                })
            })
            .catch(err => console.error(err));
        }
    }


    filterSearchBarLanguages(e)
    {
        let input = e.target.value;
        input=input.toLowerCase();
        const props = this.languages.filter(element=>element.language.toLowerCase().includes(input)||element.name.toLowerCase().startsWith(input));

        this.setState({
            searchBarValue:e.target.value,
            filterdLangs:props
        })
    }

    setPreviousInputLang(lang)
    {
        const index = (lang.name == this.state.previousInputLangs[0].name ? 1 : 0);
        
        this.setState((state)=>({
            inputLang:{language: lang.language,name: lang.name,flag: lang.flag},
            
            previousInputLangs:[
                {
                    language: state.inputLang.language,
                    name: state.inputLang.name,
                    flag: state.inputLang.flag},
                {
                    language: state.previousInputLangs[index].language,
                    name: state.previousInputLangs[index].name,
                    flag: state.previousInputLangs[index].flag
                }],
        }))   
    }

    setPreviousOutputLang(lang)
    {
        const index = (lang.name == this.state.previousOutputLangs[0].name ? 1 : 0);
        
        this.setState((state)=>({
            outputLang:{language: lang.language,name: lang.name,flag: lang.flag},
            
            previousOutputLangs:[
                {
                    language: state.outputLang.language,
                    name: state.outputLang.name,
                    flag: state.outputLang.flag},
                {
                    language: state.previousOutputLangs[index].language,
                    name: state.previousOutputLangs[index].name,
                    flag: state.previousOutputLangs[index].flag
                }],
        }))   
    }

    SwitchLanguage(e)
    {
        this.setState((state)=>({
            inputLang:state.outputLang,
            outputLang:state.inputLang,
        }))


        let targetElement;
        if (e.target.className=="switch-btn") {
            targetElement = e.target;
        }
        else
        {
            targetElement=e.target.closest(".switch-btn");
        }

        targetElement.classList.add("active");
        setTimeout(() => {
            targetElement.classList.remove("active");
        }, 700);
    }

    detectLang(lang)
    {
        
        const detectedLanguage = lang.language;
        const  language = this.languages.filter(elem=>elem.language==detectedLanguage)
        
        if (language.length!=0) {
            this.setState({
                detected:language[0]
            })            
        }
        else
        {
            this.setState({
                detected:undefined
            })            
        }
        
    }
    
}
