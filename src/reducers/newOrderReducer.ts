import { IMenu } from "../types/common";
import { ActionType, IAction } from '../actions';
import { IOrderState, IOrder, IOrderSummary, IOptionEvent } from "../store/types";
import { submitOrder } from '../lib/api';
import { v5 as uuidv5 } from 'uuid';

const initialState = (): IOrderState => ({
  orderList: [],
  currentOrder: null,
  orderer: '',
});

const createOrderFromMenu = (menu: IMenu | null): IOrder | null => {
  if (!menu) return null;
  return {
    menu,
    menuDefault: menu.menuPrices[0].name,
    options: {},
    totalPrice: 0,
  };
};

const updateOptionFromOrder = (order: IOrder, optionEvent: IOptionEvent) => {
  order.options = {
    ...order.options,
    [optionEvent.optionGroupId]: optionEvent,
  };
};

const getTotalPrice = (order: IOrder | null): number => {
  if (!order) return 0;
  let totalPrice = 0;
  const menu = order.menu;
  const defaultMenu = menu.menuPrices.find(m => m.name === order.menuDefault);
  if (!defaultMenu) {
    console.error('선택된 메뉴를 찾을 수 없습니다');
  } else {
    totalPrice += parseInt(defaultMenu.price.replace(',', ''));
  }

  for (let optionSelected of Object.values(order.options)) {
    const ogid = optionSelected.optionGroupId;
    const og = menu.optionGroups.find(og => og.optionGroupId === ogid);

    if (!og) {
      console.error('선택된 옵션을 찾을 수 없습니다');
    } else {
      const selected = new Set(optionSelected.selected);
      
      totalPrice += og.options
                      .filter(o => selected.has(o.optionId))
                      .reduce((acc, val) => acc + val.price, 0);
    }
  }

  return totalPrice;
};

const orderToSummary = (order: IOrder): IOrderSummary => {
  const entries = Object.values(order.options).map(o => {
    const og = order.menu.optionGroups.find(og => og.optionGroupId === o.optionGroupId);
    return [o.name, o.selected.map((oid: number) => og?.options?.find(x => x.optionId === oid)?.name)];
  });
  return {
    menuName: order.menu.name,
    menuDefault: order.menuDefault,
    options: Object.fromEntries(entries),
    totalPrice: order.totalPrice,
  };
};

const newOrderReducer = (state = initialState(), action: IAction): IOrderState => {
  const { type, payload } = action;

  switch(type) {
    case ActionType.SET_EVENT_ID:
      state.eventId = payload;
      break;
    case ActionType.ADD_ORDER:
      state.orderList.push(orderToSummary(state.currentOrder!));
      break;
    case ActionType.REMOVE_ORDER:
      const ol = state.orderList;
      state.orderList = [...ol.slice(0, payload), ...ol.slice(payload+1)];
      break;
    case ActionType.SUBMIT_ORDER:
      submitOrder(state.eventId!, payload, state.orderList)
      .then(() => {
        alert('주문 접수 완료');
        window.location.pathname += '/summary';
      })
      .catch(e => {
        alert('주문 접수 실패');
        console.error(e);
      });
      break;
    case ActionType.SET_SHOP:
      state.shop = payload;
      break;
    case ActionType.SET_CURRENT_ORDER:
      state.currentOrder = createOrderFromMenu(payload as IMenu | null);
      if (state.currentOrder)
        state.currentOrder!.totalPrice = getTotalPrice(state.currentOrder);
      break;
    case ActionType.UPDATE_MENU_DEFAULT:
      state.currentOrder!.menuDefault = payload;
      state.currentOrder!.totalPrice = getTotalPrice(state.currentOrder);
      break;
    case ActionType.UPDATE_OPTION:
      updateOptionFromOrder(state.currentOrder!, payload);
      state.currentOrder!.totalPrice = getTotalPrice(state.currentOrder);
      break;
  }

  return {
    ...state,
    orderList: [...state.orderList],
    currentOrder: !!state.currentOrder ? {
      ...state.currentOrder!,
    } : null,
    orderer: uuidv5('seclab', uuidv5.URL),
  };
}

export default newOrderReducer;