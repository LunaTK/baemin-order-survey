import * as apiReal from './api';
import * as apiMock from './api-mock';

//TODO: 트리쉐이킹 되게 수정
const api = process.env.REACT_APP_USE_MOCK ? apiMock : apiReal;

const {
  fetchEventInfo,
  fetchEventList,
  fetchShopInfo,
  submitOrder,
} = api;

export {
  fetchEventInfo,
  fetchEventList,
  fetchShopInfo,
  submitOrder,
}