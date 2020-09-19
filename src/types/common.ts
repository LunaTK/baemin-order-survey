export interface ShopInfo {
  name: string;
  shpoId: number;
  groupMenus: GroupMenu[];
}

export interface GroupMenu {
  name: string;
  menuGroupId: number;
  description: string;
  menus: Menu[];
}

export interface Menu {
  menuId: number;
  name: string;
  imaegs: string[];
  description: string;
  menuPrices: Price[];
  optionGroups: OptionGroup[];
}

export interface Price {
  name: string;
  price: string;
  pricePhraseType: string;
}

export interface OptionGroup {
  optionGroupId: number;
  name: string;
  minOrderableQuantity: number;
  maxOrderableQuantity: number;
  options: Option[];
}

export interface Option {
  optionId: number;
  name: string;
  price: number;
}