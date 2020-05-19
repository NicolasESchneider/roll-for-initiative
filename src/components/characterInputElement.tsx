import * as React from 'react';

import { Character, CharacterInput } from '../types/character';
import { ADD_CHARACTER } from '../hooks/useInitiativeOrder';
// import { RefCollection } from '../types/refCollection';

type CharInputProps = {
  addToInitiative: any
}

export const CharacterInputElement = (props: CharInputProps): React.ReactElement => {
  // const characterRefs = { };
  // create a reference to the inputs we're going to make
  return (
    <div>
      <input
        type='text'
        // ref={ characterRefs.setRef('name') }
        placeholder='name'
      />      
      <input
        type='number'
        placeholder='initiative'
        // ref={ characterRefs.setRef('initiative') }
      />
      <input
        type='text'
        // ref={ characterRefs.setRef('hp') }
        placeholder='HP (optional)'
      />      
    </div>
  );
}