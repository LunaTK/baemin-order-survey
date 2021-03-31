/**
 * This file includes types generally used across the project
 */
import firebase from 'firebase/app';

declare global {
  const firebase: typeof firebase;
}

export type FirestoreDocRef<T=any> = {
  id: string;
  data: () => T;
};
