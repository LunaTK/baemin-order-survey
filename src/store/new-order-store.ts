import { createStore } from 'redux';
import { newOrderReducer } from '../reducers';

const newOrderStore = createStore(newOrderReducer);

export default newOrderStore;