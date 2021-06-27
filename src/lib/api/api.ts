import { IEventInfo, ISelectedMenu } from 'src/store/types';
import { FirestoreDocRef } from 'src/types/common';
import { IShopInfo } from 'src/types/baemin';
import { initializeApp } from 'firebase/app';
import {
  arrayUnion,
  getFirestore,
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
} from 'firebase/firestore';

const firebaseKey = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!);
const fb = initializeApp(firebaseKey);
const db = getFirestore(fb);

const fetchEventList = () =>
  getDocs(query(collection(db, 'events'), orderBy('date', 'desc'))).then(
    (snapshot) => (snapshot.docs as unknown) as FirestoreDocRef<IEventInfo>[],
  );

const fetchEventInfo = (eventId: string) =>
  getDoc(doc(collection(db, 'events'), eventId)).then((snapshot) => {
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

const fetchShopInfo = (shopId: string) =>
  getDoc(doc(collection(db, 'shops'), shopId)).then((snapshot) => snapshot.data() as IShopInfo);

const submitOrder = (eventId: string, userName: string, order: ISelectedMenu[]) =>
  updateDoc(doc(collection(db, 'events'), eventId), {
    orders: arrayUnion({
      userName,
      order,
      totalPrice: order.reduce((acc, val) => acc + val.totalPrice, 0),
    }),
  });

export { fetchEventInfo, fetchEventList, fetchShopInfo, submitOrder };
