import newOrderSlice, { setShop, setEvent } from 'src/slice/new-order-slice';

const {
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addCartItem,
  removeCartItem,
  submitOrder,
  setMenuListActiveKeys,
} = newOrderSlice.actions;

export {
  setShop,
  setEvent,
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addCartItem,
  removeCartItem,
  submitOrder,
  setMenuListActiveKeys,
};
