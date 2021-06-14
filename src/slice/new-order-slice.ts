import { IMenu } from 'src/types/baemin';
import {
  IOrderState, ISelectedMenu, ISelectedMenuSimple, ISelectedOptions,
} from 'src/store/types';
import { fetchEventInfo, submitOrder as submitOrderApi, fetchShopInfo } from 'src/lib/api';
import {
  CaseReducer, createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import history from 'src/lib/history';

const initialState: IOrderState = {
  eventId: null,
  event: {
    loading: false,
  },
  shop: {
    loading: false,
  },
  selectedMenuList: [],
  currentMenu: null,
  menuListActiveKeys: [],
};

const util = {
  toSelectedMenu: (menu: IMenu | null): ISelectedMenu | null => {
    if (!menu) return null;
    return {
      menu,
      menuDefault: menu.menuPrices[0].name,
      options: Object.fromEntries(menu.optionGroups.map((og) => {
        const isRadio = og.maxOrderableQuantity === og.minOrderableQuantity && og.maxOrderableQuantity === 1;
        return [og.optionGroupId, {
          optionGroupId: og.optionGroupId,
          name: og.name,
          selected: isRadio ? [og.options[0].optionId] : [],
        }];
      })),
      totalPrice: 0,
    };
  },
  updateOption: (order: ISelectedMenu, optionEvent: ISelectedOptions) => {
    order.options = {
      ...order.options,
      [optionEvent.optionGroupId]: optionEvent,
    };
  },
  getTotalPrice: (order: ISelectedMenu | null): number => {
    if (!order) return 0;
    let totalPrice = 0;
    const { menu } = order;
    const defaultMenu = menu.menuPrices.find((m) => m.name === order.menuDefault);
    if (!defaultMenu) {
      console.error('선택된 메뉴를 찾을 수 없습니다');
    } else {
      totalPrice += parseInt(defaultMenu.price.replace(',', ''), 10);
    }

    Object.values(order.options).forEach((optionSelected) => {
      const ogid = optionSelected.optionGroupId;
      const og = menu.optionGroups.find((og) => og.optionGroupId === ogid);

      if (!og) {
        console.error('선택된 옵션을 찾을 수 없습니다');
      } else {
        const selected = new Set(optionSelected.selected);

        totalPrice += og.options
          .filter((o) => selected.has(o.optionId))
          .reduce((acc, val) => acc + val.price, 0);
      }
    });

    return totalPrice;
  },
  simplifySelectedMenu: (order: ISelectedMenu): ISelectedMenuSimple => {
    const entries = Object.values(order.options).map((o) => {
      const og = order.menu.optionGroups.find((og) => og.optionGroupId === o.optionGroupId);
      return [o.name, o.selected.map((oid: number) => og?.options?.find((x) => x.optionId === oid)?.name)];
    });
    return {
      menuName: order.menu.name,
      menuDefault: order.menuDefault,
      options: Object.fromEntries(entries),
      totalPrice: order.totalPrice,
    };
  },
};

export const setEvent = createAsyncThunk('setEvent', async (eventId: string, thunkAPI) => {
  try {
    const eventInfo = await fetchEventInfo(eventId);
    const shopId = eventInfo.shop.id;
    thunkAPI.dispatch(setShop(shopId));
    return { eventId, eventInfo };
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const setShop = createAsyncThunk('setShop', async (shopId: string, thunkAPI) => {
  try {
    return fetchShopInfo(shopId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

type OrderCaseReducer<T> = CaseReducer<IOrderState, PayloadAction<T>>;

const setCurrentMenu: OrderCaseReducer<IMenu | null> = (state, action) => {
  state.currentMenu = util.toSelectedMenu(action.payload as IMenu | null);
  if (state.currentMenu) state.currentMenu.totalPrice = util.getTotalPrice(state.currentMenu);
};

const updateMenuDefault: OrderCaseReducer<string> = (state, action) => {
  if (state.currentMenu) {
    state.currentMenu.menuDefault = action.payload;
    state.currentMenu.totalPrice = util.getTotalPrice(state.currentMenu);
  }
};

const updateOption: OrderCaseReducer<ISelectedOptions> = (state, action) => {
  if (state.currentMenu) {
    util.updateOption(state.currentMenu, action.payload);
    state.currentMenu.totalPrice = util.getTotalPrice(state.currentMenu);
  }
};

const addCartItem: OrderCaseReducer<undefined> = (state, action) => {
  if (state.currentMenu) {
    state.selectedMenuList.push(util.simplifySelectedMenu(state.currentMenu!));
  }
};

const removeCartItem: OrderCaseReducer<number> = (state, action) => {
  const ol = state.selectedMenuList;
  state.selectedMenuList = [...ol.slice(0, action.payload), ...ol.slice(action.payload + 1)];
};

const submitOrder: OrderCaseReducer<string> = (state, action) => {
  submitOrderApi(state.eventId!, action.payload, state.selectedMenuList)
    .then(() => {
      alert('주문 접수 완료');
      history.push(`${history.location.pathname}/summary`);
    })
    .catch((e) => {
      alert('주문 접수 실패');
      console.error(e);
    });
};

const setMenuListActiveKeys: OrderCaseReducer<string[]> = (state, action) => {
  state.menuListActiveKeys = action.payload;
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    setCurrentMenu,
    updateMenuDefault,
    updateOption,
    addCartItem,
    removeCartItem,
    submitOrder,
    setMenuListActiveKeys,
  },
  extraReducers: (builder) => {
    builder.addCase(setEvent.pending, (state) => {
      state.event.loading = true;
    });
    builder.addCase(setEvent.fulfilled, (state, action) => {
      state.event.loading = false;
      state.event.data = action.payload.eventInfo;
      state.eventId = action.payload.eventId;
    });
    builder.addCase(setEvent.rejected, (state, action) => {
      state.event.loading = false;
      state.event.data = undefined;
      state.event.error = action.error.message;
      state.eventId = null;
    });

    builder.addCase(setShop.pending, (state) => {
      state.shop.loading = true;
    });
    builder.addCase(setShop.fulfilled, (state, action) => {
      state.shop.loading = false;
      state.shop.data = action.payload;
    });
    builder.addCase(setShop.rejected, (state, action) => {
      state.shop.loading = false;
      state.shop.data = undefined;
      state.shop.error = action.error.message;
    });
  },
});

export default newOrderSlice;
