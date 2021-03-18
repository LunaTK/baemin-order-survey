import {  configureStore } from '@reduxjs/toolkit';
import newOrderSlice from '../slice/new-order-slice';

const newOrderStore = configureStore({ reducer: newOrderSlice.reducer });

export default newOrderStore;