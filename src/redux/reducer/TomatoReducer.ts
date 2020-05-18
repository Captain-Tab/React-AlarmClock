import {ADD_TOMATO,INIT_TOMATO} from '../action/ActionTypes';

export default (state:any[]=[], action:any)=>{
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]
    case INIT_TOMATO:
      return [...action.payload]
    default:
      return state
  }
}