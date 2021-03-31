/**
 * This file includes types used in Redux store
 */
import { IShopInfo, IMenu } from 'src/types/baemin';
import { FirestoreDocRef } from 'src/types/common';

export interface AsyncState<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export interface IEventInfo {
  shop: FirestoreDocRef<IShopInfo>;
  title: string;
  orders: {
    userName: string;
    order: ISelectedMenuSimple[];
    totalPrice: number;
  }[];
}

export interface IOrderState {
  eventId: string | null;
  event: AsyncState<IEventInfo>;
  shop: AsyncState<IShopInfo>;
  selectedMenuList: ISelectedMenuSimple[];
  currentMenu: ISelectedMenu | null;
  orderer: string;
}

export interface ISelectedMenu {
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

export interface ISelectedMenuSimple {
  menuName: string;
  menuDefault: string;
  options: {
    [key: string]: string[];
  };
  totalPrice: number;
}
