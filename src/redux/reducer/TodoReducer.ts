import {ADD_TODO, INIT_TODO,UPDATE_TODO,EDIT_TODO} from '../action/ActionTypes'

export default (state: any[]=[], action: any):any=> {
    switch (action.type) {
      case ADD_TODO:
        return [...state, action.payload]
      case INIT_TODO:
        return [...action.payload]
      case UPDATE_TODO:
         return state.map((t:any)=>{
          if(t.id === action.payload.id){
            return action.payload
          }else {
            return t
          }
        })
      case EDIT_TODO:
        return state.map((t: any)=>{
          if(t.id === action.payload){
            return Object.assign({},t,{editing: true})
          }else {
            return Object.assign({},t,{editing: false})
          }
        })
      default:
        return state
    }
}