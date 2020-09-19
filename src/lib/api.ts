import firebase from 'firebase/app';
import 'firebase/firestore';
import { ShopInfo } from '../types/common';
import firebaseKey from '../../firebase-key.json';

const fb = firebase.initializeApp(firebaseKey);

const db = fb.firestore();

const getShopData = (shopId: number) => db.collection('shops').doc(`${shopId}`).get().then(snapshot => snapshot.data() as ShopInfo);

export {
  getShopData,
}

