import newOrderSlice, { setShop, setEvent } from '../slice/new-order-slice';

const {
  setCurrentOrder,
  updateMenuDefault,
  updateOption,
  addOrder,
  removeOrder,
  submitOrder,
} = newOrderSlice.actions;

export {
  setShop,
  setEvent,
  setCurrentOrder,
  updateMenuDefault,
  updateOption,
  addOrder,
  removeOrder,
  submitOrder,
}