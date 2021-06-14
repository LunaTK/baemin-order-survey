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
  orders: IOrder[];
}

export interface IOrder {
  userName: string;
  order: ISelectedMenu[];
  totalPrice: number;
}

export interface IOrderState {
  eventId: string | null; //? 이벤트의 id
  event: AsyncState<IEventInfo>; //? 이벤트의 구체적인 json 데이터
  shop: AsyncState<IShopInfo>; //? 이벤트에 해당하는 상점의 json 데이터
  selectedMenuList: ISelectedMenu[]; //? 장바구니에 담은 메뉴들
  currentMenu: ICurrentMenu | null; //? 옵션을 선택중인 메뉴
  menuListActiveKeys: string[]; //? 메뉴 목록에서 그룹별 펼침/접음 상태
}

export interface ICurrentMenu {
  menu: IMenu;
  menuDefault: string;
  options: {
    [key: number]: ISelectedOptions;
  },
  totalPrice: number;
}

export interface ISelectedOptions {
  optionGroupId: number;
  name: string;
  selected: number[];
}

export interface ISelectedMenu {
  menuName: string;
  menuDefault: string;
  options: {
    [key: string]: string[];
  };
  totalPrice: number;
}
