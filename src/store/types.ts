/**
 * This file includes types used in Redux store
 */
import { IShopInfo, IMenu, IEventInfo } from "src/types/common";

export interface AsyncState<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export interface IOrderState {
  eventId: string | null;
  event: AsyncState<IEventInfo>;
  shop: AsyncState<IShopInfo>;
  orderList: IOrderSummary[];
  currentOrder: IOrder | null;
  orderer: string;
}
  
export interface IOrder {
  menu: IMenu;
  menuDefault: string;
  options: {
    [key: number]: IOptionEvent;
  },
  totalPrice: number;
}

export interface IOptionEvent {
  optionGroupId: number;
  name: string;
  selected: number[];
}

export interface IOrderSummary {
  menuName: string;
  menuDefault: string;
  options: {
    [key: string]: string[];
  };
  totalPrice: number;
}