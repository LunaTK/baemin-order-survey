/// <reference types="firebase/app" />
/**
 * This file includes types generally used across the project
 */

declare global {
  const firebase: typeof firebase;
}

export type FirestoreDocRef<T = any> = {
  id: string;
  data: () => T;
};
