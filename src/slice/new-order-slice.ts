import { IMenu } from "src/types/common";
import { IOrderState, IOrder, IOrderSummary, IOptionEvent } from "src/store/types";
import { fetchEventInfo, submitOrder as submitOrderApi, fetchShopInfo } from 'src/lib/api';
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrderState = {
  eventId: null,
  event: {
    loading: false
  },
  shop: {
    loading: false
  },
  orderList: [],
  currentOrder: null,
  orderer: '',
};

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

const setCurrentOrder: OrderCaseReducer<IMenu | null> = (state, action) => {
  state.currentOrder = createOrderFromMenu(action.payload as IMenu | null);
  if (state.currentOrder)
    state.currentOrder.totalPrice = getTotalPrice(state.currentOrder)
};

const updateMenuDefault: OrderCaseReducer<string> = (state, action) => {
  if (state.currentOrder) {
    state.currentOrder.menuDefault = action.payload;
    state.currentOrder.totalPrice = getTotalPrice(state.currentOrder);
  }
};

const updateOption: OrderCaseReducer<IOptionEvent> = (state, action) => {
  if (state.currentOrder) {
    updateOptionFromOrder(state.currentOrder, action.payload);
    state.currentOrder.totalPrice = getTotalPrice(state.currentOrder);
  }
};

const addOrder: OrderCaseReducer<undefined> = (state, action) => {
  if (state.currentOrder) {
    state.orderList.push(orderToSummary(state.currentOrder!));
  }
};

const removeOrder: OrderCaseReducer<number> = (state, action) => {
  const ol = state.orderList;
  state.orderList = [...ol.slice(0, action.payload), ...ol.slice(action.payload+1)]; 
};

const submitOrder: OrderCaseReducer<string> = (state, action) => {
  submitOrderApi(state.eventId!, action.payload, state.orderList)
    .then(() => {
      alert('주문 접수 완료');
      window.location.pathname += '/summary';
    })
    .catch(e => {
      alert('주문 접수 실패');
      console.error(e);
    });
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    setCurrentOrder,
    updateMenuDefault,
    updateOption,
    addOrder,
    removeOrder,
    submitOrder,
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
  }
});

export default newOrderSlice;
