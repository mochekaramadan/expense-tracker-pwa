import { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'ExpenseTrackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'transactions';

export const useIndexedDB = () => {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              const store = db.createObjectStore(STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
              });
              store.createIndex('date', 'date');
              store.createIndex('type', 'type');
              store.createIndex('category', 'category');
            }
          },
        });
        setDb(database);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      } finally {
        setLoading(false);
      }
    };

    initDB();
  }, []);

  const addTransaction = async (transaction) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const result = await store.add({
        ...transaction,
        id: Date.now(), // Simple ID generation
        createdAt: new Date().toISOString(),
      });
      await tx.done;
      return result;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const getAllTransactions = async () => {
    if (!db) return [];
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const result = await store.getAll();
      return result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  };

  const deleteTransaction = async (id) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.delete(id);
      await tx.done;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  const updateTransaction = async (id, updates) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const existing = await store.get(id);
      if (existing) {
        await store.put({ ...existing, ...updates });
      }
      await tx.done;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  return {
    loading,
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction,
  };
};