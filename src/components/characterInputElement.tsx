import * as React from 'react';
import { uuid } from 'uuidv4';

import { ADD_CHARACTER } from '../hooks/useInitiativeOrder';
import { Character } from '../types/character';

type CharInputProps = {
  addToInitiative: any
}

export const CharacterInputElement = ({ addToInitiative }: CharInputProps): React.ReactElement => {
  const characterRefs = {} as { [key: string]: HTMLInputElement | null};
  const [error, setError] = React.useState('');

  const REQUIRED_MAP = {
    'name': 'A name is required',
    'initiative': 'An initiative score is required',
    'hp': false,
  } as { [key: string]: any };
  // mapping each field to its error message
  const handleClear = (): void => {
    // clear the form
    Object.keys(REQUIRED_MAP).forEach(key => {
      const node = characterRefs[key] as HTMLInputElement;
      console.log(node.value.length);
      node.value = '';
    });
  }

  const handleSubmit = (): void => {
    const id = uuid();
    let errorMessage = '';
    // create the new character from the input and validate it
    const newChar = Object.keys(REQUIRED_MAP).reduce((acc, key) => {
      const node = characterRefs[key] as HTMLInputElement;
      if (REQUIRED_MAP[key] && !node.value) {
        errorMessage = REQUIRED_MAP[key];
      }
      return { ...acc, [key]: node.value };
    }, { id } as Character);
  
    if (errorMessage) {
      // input was invalid
      setError(errorMessage);
    } else {
      // valid input! dispatch to reducer
      newChar.hp = Number(newChar.hp);
      newChar.initiative = Number(newChar.initiative);
      addToInitiative({
        character: newChar,
        type: ADD_CHARACTER,
      });
      handleClear();
    }
  }

  return (
    <div className='character-input-form'>
      { error &&
        <h1 className='error-message'>
          { error }
        </h1>
      }
      <input
        type='text'
        placeholder='name'
        ref={ (node):void => { characterRefs['name'] = node } }
      />      
      <input
        type='number'
        placeholder='initiative'
        ref={ (node):void => { characterRefs['initiative'] = node } }
      />
      <input
        type='number'
        placeholder='HP (optional)'
        ref={ (node):void => { characterRefs['hp'] = node } }
      />
      <button onClick={ handleSubmit }>Add Character</button>
    </div>
  );
}