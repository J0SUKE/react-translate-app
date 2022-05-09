import React from "react";

export default class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const{SearchBarValue,filterSearchBarLanguages} = this.props;
        return (
                <form action="">
                    <input 
                            type="text" 
                            placeholder="Search here..."
                            onClick={this.selectSearchBar}
                            onInput={filterSearchBarLanguages}
                            value={SearchBarValue}
                            />
                </form>
        )
    }

    selectSearchBar(e)
    {
        e.stopPropagation();
    }
}