import { IOrderSummary } from './../store/types';
import { IEventInfo, IShopInfo } from './../types/common';
import firebaseKey from '../firebase-key.json';

const fb = firebase.initializeApp(firebaseKey);
const db = fb.firestore();

const getEventList = () => db.collection('events').orderBy("date").get().then(snapshot => snapshot.docs);

const getEvent = (eventId: string) => db.collection('events').doc(eventId).get().then(snapshot => snapshot.data() as IEventInfo);

const getShopData = (shopId: string) => db.collection('shops').doc(`${shopId}`).get().then(snapshot => snapshot.data() as IShopInfo);

const submitOrder = (eventId: string, userName: string, order: IOrderSummary[]) => {
  return db.collection('events').doc(eventId).update({
    orders: firebase.firestore.FieldValue.arrayUnion({
      userName,
      order,
      totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
    }),
  });
};

export {
  db,
  getEvent,
  getEventList,
  getShopData,
  submitOrder,
}