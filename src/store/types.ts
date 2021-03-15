import { IShopInfo, IMenu } from "../types/common";

export interface IOrderState {
  eventId?: string;
  shop: IShopInfo | null;
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