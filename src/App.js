import './App.css';
import React, { Component } from 'react';
import Searchbar from './components/searchbar';
import DataTable from './components/dataTable';
import firebase from './firebase'

class App extends Component {
  state = {
      playerViews: [],
      requestingSearch: false,
      mostSearchedPlayers: [],
      searchResults: [],
  };

  componentDidMount() {
    let searchResults = [];
    firebase.firestore().collection('players')
      .get()
      .then(collectionRef => (
        searchResults = collectionRef.docs.map(docRef => docRef.id),
        this.setState( { searchResults } )
      ));
  };

  handleSearch = query => {
    const playerViews = this.state.playerViews
    const newPlayerViews = playerViews.concat( { id: playerViews.length+1, name: query } );

    this.setState( { playerViews: newPlayerViews } );
  };

  handleDelete = id => {
    let playerViews = this.state.playerViews.filter(playerView => playerView.id !== id);
    playerViews = playerViews.map(playerView => {
      let newPlayerView = {id: this.state.playerViews.indexOf(playerView), name: playerView.name};
      return newPlayerView;
    });

    this.setState({ playerViews });
  };

  updateMostPopularPlayers = query => {
    // firebase.firestore().collection
    return null;
  };

  getMainView() {
    if (this.state.playerViews.length === 0) {
      return (
        <div>
          <Searchbar 
            onSearch={query => this.handleSearch(query)}
            searchResults={this.state.searchResults}
            onUpdateMostPopularPlayers={query => this.updateMostPopularPlayers(query)}
          />
          <h2>Most Searched Players</h2>
          {this.state.mostSearchedPlayers.map(player => 
            <li>{player}</li>
          )}
        </div>
      )
    }
    return (
      <div>
        <div class="row">
          {this.state.playerViews.map(playerView => (
            <div class="col-sm">
              <DataTable 
                key={playerView.id}
                playerName={playerView.name} 
              />
              <div>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => this.handleDelete(playerView.id)}
                >
                  Delete
                </button>
              </div>
            </div>))}
        </div>
        <div class="col-sm">
          {this.getAddMoreView()}
        </div>
      </div>
    );
  }

  getAddMoreView() {
    if (this.state.requestingSearch) {
      return (
        <Searchbar 
          onSearch={query => this.handleSearch(query)}
          searchResults={this.state.searchResults}
          onUpdateMostPopularPlayers={query => this.updateMostPopularPlayers(query)}
        />
    )}
    return (
      <button 
        type="button" 
        onClick={() => this.setState({ requestingSearch: true})}
      >
        Add
      </button>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="container">
            {this.getMainView()}
          </div>
        </header>
      </div>
    );
  };
}

export default App;