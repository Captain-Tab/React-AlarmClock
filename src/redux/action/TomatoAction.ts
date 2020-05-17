import {ADD_TOMATO} from './ActionTypes';


export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};