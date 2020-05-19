import {ADD_TOMATO,INIT_TOMATO,UPDATE_TOMATO} from '../action/ActionTypes';

export default (state:any[]=[], action:any)=>{
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]
    case INIT_TOMATO:
      return [...action.payload]
    case UPDATE_TOMATO:
      return state.map((t:any)=>{
        if(t.id === action.payload.id){
          return action.payload
        }else {
          return t
        }
      })
    default:
      return state
  }
}