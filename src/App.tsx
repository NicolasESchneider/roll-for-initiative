import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { useInitiative } from './hooks/useInitiativeOrder';
import { Character } from './types/character';
import { CharacterInputElement } from './components/characterInputElement';

function App(): React.ReactElement {
  const [combatBegun, toggleCombat] = React.useState(false);
  const [initiative, dispatch] = useInitiative([] as Character[]);
  console.log(initiative);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Roll For Initiative</h1>
        <h2>Free Initiative Tracker</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <CharacterInputElement addToInitiative={ dispatch } />
        <span className='initiative-order-tile'>
          { 
            initiative.map(char => {
              return (
                <div className='char-display-tile' key={ char.id }>
                  <h2>{ char.name }</h2>
                  <h3>{ char.initiative }</h3>
                </div>
              )
            })  
          }
        </span>
        {
          combatBegun ?
          <h1>Roll to Hit!</h1> :
          <button onClick={ (): void => toggleCombat(true)}>Start Combat!</button>
        }
      </header>
    </div>
  );
}

export default App;
