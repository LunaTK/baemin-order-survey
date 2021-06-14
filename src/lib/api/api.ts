import { IEventInfo, ISelectedMenu } from 'src/store/types';
import { FirestoreDocRef } from 'src/types/common';
import { IShopInfo } from 'src/types/baemin';
import firebaseKey from 'src/firebase-key.json';
import { v5 as uuidv5 } from 'uuid';

const fb = firebase.initializeApp(firebaseKey);
const db = fb.firestore();

const fetchEventList = () => db.collection('events').orderBy('date').get().then((snapshot) => snapshot.docs as unknown as FirestoreDocRef<IEventInfo>[]);

const fetchEventInfo = (eventId: string) => db.collection('events').doc(eventId).get().then((snapshot) => {
  const eventInfo = snapshot.data() as IEventInfo;
  /**
   * Make shopInfo object serializable
   * https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
   */
  eventInfo.shop = {
    id: eventInfo.shop.id,
    data: () => eventInfo.shop.data(),
  };
  return eventInfo;
});

const fetchShopInfo = (shopId: string) => db.collection('shops').doc(`${shopId}`).get().then((snapshot) => snapshot.data() as IShopInfo);

const submitOrder = (eventId: string, userName: string, order: ISelectedMenu[]) => db.collection('events').doc(eventId).update({
  orders: firebase.firestore.FieldValue.arrayUnion({
    userName,
    order,
    totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
    orderer: uuidv5('seclab', uuidv5.URL),
  }),
});

export {
  fetchEventInfo,
  fetchEventList,
  fetchShopInfo,
  submitOrder,
};
