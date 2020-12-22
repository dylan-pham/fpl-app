import React, { Component } from 'react';

class Searchbar extends Component {
  getSearchResults() {
    return (
      this.props.searchResults.map(result =>
        <option value={result}/>
      )
    );
  };

  render() {
    return (
      <div>
        <form className="form-inline">
          <input 
            className="form-control mr-sm-2" 
            id="query"
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            list="players"
          />
          <datalist 
            id="players">
            {this.getSearchResults()}
          </datalist>
          <button 
            className="btn btn-outline-success my-2 my-sm-0" 
            type="button" 
            onClick={() => {
              this.props.onSearch(document.getElementById("query").value);
              this.props.onUpdateMostPopularPlayers(document.getElementById("query").value);
            }}
          >
            Search
          </button>
        </form>
      </div>
    );
  };
};

export default Searchbar;