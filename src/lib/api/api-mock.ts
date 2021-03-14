import { IOrderSummary } from '../../store/types';
import { FirestoreDocRef, IEventInfo, IShopInfo } from '../../types/common';
import shopSample from '../../mocks/shop-sample.json';

const sampleEvent: IEventInfo = {
  title: "샘플 식사 이벤트",
  shop: {
      id: "sample",
      data: () => shopSample
  },
  orders: [
    {"userName":"Elon Musk","order":[{"menuName":"광양식바싹불고기 반상","menuDefault":"","options":{"추가선택":["핫윙콤보(윙+봉) 2조각","정관장 홍삼원 골드"]},"totalPrice":10700}],"totalPrice":10700},
    {"userName":"Mark Zuckerberg","order":[{"menuName":"세종대왕 궁중 한정식","menuDefault":"","options":{"추가선택":["핫윙콤보(윙+봉) 2조각"]},"totalPrice":29700},{"menuName":"바싹불고기떡볶이","menuDefault":"","options":{"추가선택":["단호박 식혜","사이다"]},"totalPrice":8400}],"totalPrice":38100}
  ]
}; 

const getEventList = (): Promise<FirestoreDocRef<IEventInfo>[]> => Promise.resolve([{
  id: "sample",
  data: () => sampleEvent
}]);

const getEvent = (eventId: string): Promise<IEventInfo> => Promise.resolve(sampleEvent);

const getShopData = (shopId: string): Promise<IShopInfo> => Promise.resolve(shopSample);

const submitOrder = (eventId: string, userName: string, order: IOrderSummary[]) => {
  console.log(JSON.stringify({
    userName,
    order,
    totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
  }));
  return Promise.resolve();
}

export {
  getEvent,
  getEventList,
  getShopData,
  submitOrder,
}