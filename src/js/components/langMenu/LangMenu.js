import React from "react";
import LangChoice from "./langChoice.js";
import SearchBar from "./searchBar.js";
export default class LangMenu extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        
        const {languages,setLang,SearchBarValue,filterSearchBarLanguages,filterdLangs} = this.props;

        let items;
        
        if (SearchBarValue=="") {
            items=[...languages];
        }
        else
        {
            items=[...filterdLangs];
        }


        items = items.map(element=>{
            return (<LangChoice 
                            imageURL={element.flag} 
                            lang={element.name}
                            key={Math.random()*1000}
                            setLang={()=>{setLang(element)}}
                            />)
        })
        
        return (
            <menu className="select-lang-menu">
                <SearchBar 
                        SearchBarValue={SearchBarValue}
                        filterSearchBarLanguages={filterSearchBarLanguages}
                        />
                <ul>
                    {items}
                </ul>
            </menu>
        )
    }
}