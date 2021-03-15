import { IOptionEvent } from '../store/types';
import { IMenu, IShopInfo } from '../types/common';

export enum ActionType {
  SET_EVENT_ID,

  SET_SHOP,
  SET_CURRENT_ORDER,
  UPDATE_MENU_DEFAULT,
  UPDATE_OPTION,

  ADD_ORDER,
  REMOVE_ORDER,
  SUBMIT_ORDER,
};

export type Test = {
  [ActionType.SET_EVENT_ID]: string,

  [ActionType.SET_SHOP]: string,
  [ActionType.SET_CURRENT_ORDER]: string,
  [ActionType.UPDATE_MENU_DEFAULT]: string,
  [ActionType.UPDATE_OPTION]: string,

  [ActionType.ADD_ORDER]: string,
  [ActionType.REMOVE_ORDER]: string,
  [ActionType.SUBMIT_ORDER]: string,
}

export const setEventId = (eventId: string) => ({
  type: ActionType.SET_EVENT_ID,
  payload: eventId,
} as const);

export const setShop = (shop: IShopInfo | null) => ({
  type: ActionType.SET_SHOP,
  payload: shop,
} as const);

export const setCurrentOrder = (menu: IMenu | null) => ({
  type: ActionType.SET_CURRENT_ORDER,
  payload: menu,
} as const);

export const updateMenuDefault = (menuDefault: string) => ({
  type: ActionType.UPDATE_MENU_DEFAULT,
  payload: menuDefault,
} as const);

export const updateOption = (e: IOptionEvent) => ({
  type: ActionType.UPDATE_OPTION,
  payload: e,
} as const);

export const addOrder = () => ({
  type: ActionType.ADD_ORDER,
  payload: undefined,
} as const);

export const removeOrder = (index: number) => ({
  type: ActionType.REMOVE_ORDER,
  payload: index,
} as const);

export const submitOrder = (userName: string) => ({
  type: ActionType.SUBMIT_ORDER,
  payload: userName,
} as const);

export type IAction = 
  | ReturnType<typeof setEventId>
  | ReturnType<typeof setShop>
  | ReturnType<typeof setCurrentOrder>
  | ReturnType<typeof updateMenuDefault>
  | ReturnType<typeof updateOption>
  | ReturnType<typeof addOrder>
  | ReturnType<typeof removeOrder>
  | ReturnType<typeof submitOrder>