import { openDB } from 'idb';

export const dbPromise = openDB('notes-db', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('groups')) {
      db.createObjectStore('groups', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('notes')) {
      db.createObjectStore('notes', { keyPath: 'id' });
    }
  }
});
