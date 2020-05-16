import {createStore} from 'redux';
import rootReducer from './reducer/RootReducer'

const store = createStore(rootReducer)

export default store