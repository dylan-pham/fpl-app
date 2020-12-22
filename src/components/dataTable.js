import React, { Component } from 'react';
import firebase from 'firebase';

class DataTable extends Component {
  state = {
    playerPosition: "",
    data: {},
    statNames: [
      'squad', 'comp_level',
      'games', 'games_starts', 'minutes',
      'goals', 'xg', 'npxg', 'shots_total', 'shots_on_target', 'pens_made', 'pens_att', 
      'assists', 'xa', 'assists_per90', 'xa_per90',
      'goals_per_shot','goals_per_shot_on_target',
      'goals_per90', 'xg_per90', 'npxg_per90', 'shots_total_per90', 'shots_on_target_per90', 'goals_pens_per90'
      ],
    tableHeaders: [
      'Season', 'Squad', 'League',
      'MP', 'Starts', 'Min',
      'Gls', 'xG', 'npxG', 'Sh', 'SoT', 'PK', 'PKatt', 
      'Ast', 'xA', 'Ast/90', 'xA/90',
      'G/Sh','G/SoT',
      'Gls/90', 'xG/90', 'npxG/90', 'Sh/90', 'SoT/90', 'G-PK/90'
      ],
    seasons: [],
  };

  componentDidMount() {
    firebase.firestore().collection('players')
      .doc(this.props.playerName)
      .get()
      .then(docRef => {
        this.setState(
          { playerPosition: docRef.get('position') });
      }).catch(err => alert(err));

    firebase.firestore().collection('players')
      .doc(this.props.playerName)
      .collection('overview')
      .get()
      .then(collectionRef => {
        let data = {};
        collectionRef.docs.forEach(docRef => data[docRef.id] = docRef.data());
        // let tableHeaders = Object.keys(collectionRef.docs[0].data());
        let seasons = collectionRef.docs.map(docRef => docRef.id);
        this.setState( { data: data, seasons: seasons } );
      }).catch(err => alert(err));
  };

  render() {
    return (
      <div>
        <h1>{this.props.playerName}</h1>
        <h2>{this.state.playerPosition}</h2>
        <table 
          class="table table-hover table-dark table-sm text-xsmall" 
          style={{fontSize: "15px"}}
        >
          <thead style={{fontSize: "10px"}}>
            <tr>
              {this.state.tableHeaders.map(tableHeader => (
                <th scope="col">{tableHeader}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.seasons.map(season => 
              <tr>
                <th scope="row">{season}</th>
                {this.state.statNames.map(statName =>
                  <td>{this.state.data[season][statName]}</td>
                )}
              </tr>)}
          </tbody>
        </table>      
      </div>
    );
  };
};

export default DataTable;