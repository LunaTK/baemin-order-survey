/**
 * This file includes types generally used across the project
 */
import firebase from 'firebase/app';

declare global {
  var firebase: typeof firebase;
}

export type FirestoreDocRef<T=any> = {
  id: string;
  data: () => T;
};
