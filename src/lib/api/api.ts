import { IOrderSummary } from '../../store/types';
import { FirestoreDocRef, IEventInfo, IShopInfo } from '../../types/common';
import firebaseKey from '../../firebase-key.json';
import { v5 as uuidv5 } from 'uuid';

const fb = firebase.initializeApp(firebaseKey);
const db = fb.firestore();

const getEventList = () => db.collection('events').orderBy("date").get().then(snapshot => snapshot.docs as unknown as FirestoreDocRef<IEventInfo>[]);

const getEvent = (eventId: string) => db.collection('events').doc(eventId).get().then(snapshot => snapshot.data() as IEventInfo);

const getShopData = (shopId: string) => db.collection('shops').doc(`${shopId}`).get().then(snapshot => snapshot.data() as IShopInfo);

const submitOrder = (eventId: string, userName: string, order: IOrderSummary[]) => {
  return db.collection('events').doc(eventId).update({
    orders: firebase.firestore.FieldValue.arrayUnion({
      userName,
      order,
      totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
      orderer: uuidv5('seclab', uuidv5.URL),
    }),
  });
};

export {
  getEvent,
  getEventList,
  getShopData,
  submitOrder,
}