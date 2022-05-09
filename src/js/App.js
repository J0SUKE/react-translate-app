import React from "react";
import LangSection from "./components/LangSection.js";
import LangMenu from "./components/langMenu/LangMenu.js";
import InputZone from "./components/inputZone.js";
import languages from "./data/languages.js"
import {getLength} from "./utils/mathUtils.js";


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
            searchBarValue:""
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
                        </div>
                        <InputZone
                            value={this.state.value}
                            updateValue={this.handleTextInput.bind(this)}
                            translateText={this.translateText.bind(this)}
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
        
        // fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages?target=en', options)
        //     .then(response => response.json())
        //     .then(response =>
        //         { 
        //             this.languages=response.data.languages;    
        //             console.log(this.languages)
        //         })
        //     .catch(err => console.error(err));
    }

    setInputLang(lang)
    {
        this.setState({
            inputLang:lang  
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
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", input);
        encodedParams.append("target", this.state.outputLang.language);
        encodedParams.append("source", this.state.inputLang.language);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': 'f2eb276479mshe2588f6254e9b51p1ef845jsn0e64a991a846'
            },
            body: encodedParams
        };

        // fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        //     .then(response => response.json())
        //     .then(response=>response.data.translations[0].translatedText)
        //     .then((response)=>{
        //         this.setState({
        //             translated:response
        //         })
        //     })
        //     .catch(err => console.error(err));
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

    getFlag(lang,element)
    {
        fetch(`https://restcountries.com/v3.1/lang/${lang}`)
        .then((resp)=>
            {
                return new Promise((resolve,reject)=>{
                    if (resp.status!=404) {
                        resolve(resp)
                    }
                    else
                    {
                        reject("not found")
                    }
                })
            })
        .then((resp)=>resp.json())
        .then((data)=>data.filter(country=>country.independent))
        .then((resp)=>{
                if (resp.length>1) {
                    resp = resp.sort((a,b)=>(a.population-b.population));
                    resp = resp.filter(country=>getLength(country.languages)==1);

                    if (resp.length==1) {
                        return resp[0].flags.svg;
                    }
                    else
                    {
                        return resp[resp.length-1].flags.svg;
                    }
                }    
                else
                {
                    return resp[0].flags.svg;
                }
            })
        .then(data=>{element["flag"]=data})
        .catch(rep=>{
            element["flag"]="#";
        })

    }

    setPreviousInputLang(lang)
    {
        const index = (lang.name == this.state.previousInputLangs[0].name ? 1 : 0);
        console.log(index);
        
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
        console.log(index);
        
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
    
}