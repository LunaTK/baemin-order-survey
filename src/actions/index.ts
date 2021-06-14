import newOrderSlice, { setShop, setEvent } from 'src/slice/new-order-slice';

const {
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addSelectedMenu,
  removeSelectedMenu,
  submitOrder,
  setMenuListActiveKeys,
} = newOrderSlice.actions;

export {
  setShop,
  setEvent,
  setCurrentMenu,
  updateMenuDefault,
  updateOption,
  addSelectedMenu,
  removeSelectedMenu,
  submitOrder,
  setMenuListActiveKeys,
};
