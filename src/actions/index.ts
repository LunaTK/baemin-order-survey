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

export interface IAction {
  type: ActionType;
  payload: any;
}

export const setEventId = (eventId: string) => ({
  type: ActionType.SET_EVENT_ID,
  payload: eventId,
});

export const setShop = (shop: IShopInfo | null) => ({
  type: ActionType.SET_SHOP,
  payload: shop,
});

export const setCurrentOrder = (menu: IMenu | null) => ({
  type: ActionType.SET_CURRENT_ORDER,
  payload: menu,
});

export const updateMenuDefault = (menuDefault: string) => ({
  type: ActionType.UPDATE_MENU_DEFAULT,
  payload: menuDefault,
});

export const updateOption = (e: IOptionEvent): IAction => ({
  type: ActionType.UPDATE_OPTION,
  payload: e,
});

export const addOrder = () => ({
  type: ActionType.ADD_ORDER,
});

export const removeOrder = (index: number) => ({
  type: ActionType.REMOVE_ORDER,
  payload: index,
});

export const submitOrder = (userName: string) => ({
  type: ActionType.SUBMIT_ORDER,
  payload: userName,
});