import React from "react";
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const Search = ({ searchInput, setSearchInput, autocomplete, searchLocation, clearSearch }) => {
    return (
        <header className="search-input">
            <div id="search-input">
                <form>
                    <input type="text" autoFocus placeholder="Search location" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                    <button onClick={e => { e.preventDefault(); autocomplete[0] && searchLocation(autocomplete[0]) }}><SearchIcon /></button>
                    <button onClick={e => clearSearch(e)}><ClearIcon /></button>
                </form>
            </div>
            <div className="autocomplete-container" >
                {
                    autocomplete.map(location => {
                        return <div className="location" key={uuidv4()} onClick={(e) => searchLocation(location)}>{location.place_name}</div>
                    })
                }
            </div>
        </header>
    )
}
export default Search