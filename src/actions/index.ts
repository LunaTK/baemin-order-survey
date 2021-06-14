import newOrderSlice, { setShop, setEvent } from 'src/slice/new-order-slice';

const {
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addOrder,
  removeOrder,
  submitOrder,
  setMenuListActiveKeys,
} = newOrderSlice.actions;

export {
  setShop,
  setEvent,
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addOrder,
  removeOrder,
  submitOrder,
  setMenuListActiveKeys,
};
