/**
 * This file includes types generally used across the project
 */

export type FirestoreDocRef<T = any> = {
  id: string;
  data: () => T;
};
