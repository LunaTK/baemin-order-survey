import * as apiReal from './api';
import * as apiMock from './api-mock';

const api = process.env.REACT_APP_USE_MOCK ? apiMock : apiReal;

const {
  getEvent,
  getEventList,
  getShopData,
  submitOrder,
} = api;

export {
  getEvent,
  getEventList,
  getShopData,
  submitOrder,
}