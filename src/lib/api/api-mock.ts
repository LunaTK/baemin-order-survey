import { IEventInfo, ISelectedMenu } from 'src/store/types';
import { FirestoreDocRef } from 'src/types/common';
import { IShopInfo } from 'src/types/baemin';
import shopSample from 'src/mocks/shop-sample.json';

const sampleEvent: IEventInfo = {
  title: '샘플 식사 이벤트',
  shop: {
    id: 'sample',
    data: () => shopSample,
  },
  orders: [
    {
      userName: 'Elon Musk',
      order: [{
        menuName: '광양식바싹불고기 반상', menuDefault: '', options: { 추가선택: ['핫윙콤보(윙+봉) 2조각', '정관장 홍삼원 골드'] }, totalPrice: 10700,
      }],
      totalPrice: 10700,
    },
    {
      userName: 'Mark Zuckerberg',
      order: [{
        menuName: '세종대왕 궁중 한정식', menuDefault: '', options: { 추가선택: ['핫윙콤보(윙+봉) 2조각'] }, totalPrice: 29700,
      }, {
        menuName: '바싹불고기떡볶이', menuDefault: '', options: { 추가선택: ['단호박 식혜', '사이다'] }, totalPrice: 8400,
      }],
      totalPrice: 38100,
    },
  ],
};

const fetchEventList = (): Promise<FirestoreDocRef<IEventInfo>[]> => Promise.resolve([{
  id: 'sample',
  data: () => sampleEvent,
}]);

const fetchEventInfo = (eventId: string): Promise<IEventInfo> => Promise.resolve(sampleEvent);

const fetchShopInfo = (shopId: string): Promise<IShopInfo> => Promise.resolve(shopSample);

const submitOrder = (eventId: string, userName: string, order: ISelectedMenu[]) => {
  console.log(JSON.stringify({
    userName,
    order,
    totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
  }));
  return Promise.resolve();
};

export {
  fetchEventInfo,
  fetchEventList,
  fetchShopInfo,
  submitOrder,
};
