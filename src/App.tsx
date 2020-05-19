import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { useInitiative } from './hooks/useInitiativeOrder';
import { Character } from './types/character';
import { CharacterInputElement } from './components/characterInputElement';

function App(): React.ReactElement {
  const [combatBegun, toggleCombat] = React.useState(false);
  const [initiative, dispatch] = useInitiative([] as Character[]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Roll For Initiative</h1>
        <h2>Free Initiative Tracker</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <CharacterInputElement addToInitiative={ dispatch } />
        {
          initiative.map(char => {
            return (
              <div className='char-display-tile'>
                <h1>{ char.name }</h1>
                <h2>{ char.initiative }</h2>
              </div>
            )
          })  
        }
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
