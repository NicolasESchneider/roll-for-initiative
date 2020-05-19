import * as React from 'react';
import { Character } from '../types/character';

export const ADD_CHARACTER = 'ADD_CHARACTER';


// This is how a Reducer is Typed.
// this is what React.useReducer takes as its first argument
type Reducer<S, A> = (prevState: S, action: A) => S;

function useInitiativeReducer(state: Character[], action: any): Character[] {
  switch (action.type) {
    case ADD_CHARACTER:
      // [20, 15, 13]
      // incoming 14, we need to make state look like [20, 15, 14, 13],
      // without sorting the array every time
      let leftState = [] as Character[];
      let rightState = [] as Character[];
      for (let i = 0; i < state.length; i++) {
        if (state[i].initiative <= action.initiative) {
          leftState = state.slice(0, i);
          rightState = state.slice(i);
          break;
        }
      }
      return  [...leftState, action.character, ...rightState];

    default:
      return [...state];
  }
}

export const useInitiative = (initialState: Character[]): [Character[], any] => {
  return React.useReducer(useInitiativeReducer, initialState);
}

// this function will add a number to a sorted array in O(N) time
// we will only ever add characters one at a time,
// an array of length 0 is sorted, so is length 1,
// ergo we will always have a sorted array for initiative order
// function addToArray(x: number[], y: number): number[] {
//   let leftx = [];
//   let rightx = [];
//   for (let i = 0; i < x.length; i++) {
//     if (x[i] <= y) {
//       leftx = x.slice(0, i);
//       rightx = x.slice(i);
//     }
//   }
//   return  [...leftx, y, ...rightx];
// }