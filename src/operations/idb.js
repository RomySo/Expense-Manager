const DB_NAME = "GrushIODB"; // Name of the IndexedDB database
const DB_VERSION = 1; // Version of the database
const STORE_NAME = "CostManagement"; // Name of the object store

// Function to open the database
export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Event handler for when the database needs to be upgraded
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Create the object store if it doesn't already exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    };

    // Event handler for successful database open
    request.onsuccess = (event) => resolve(event.target.result);
    // Event handler for database open error
    request.onerror = (event) => reject(event.target.error);
  });
}

// Function to add data to the object store
export function addData(data) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(data);

      // Event handler for successful data addition
      request.onsuccess = () => resolve(request.result);
      // Event handler for data addition error
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

// Function to remove data from the object store
export function removeData(key) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      // Event handler for successful data removal
      request.onsuccess = () => resolve(request.result);
      // Event handler for data removal error
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

// Function to get all data from the object store
export function getData() {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      // Event handler for successful data retrieval
      request.onsuccess = () => resolve(request.result);
      // Event handler for data retrieval error
      request.onerror = (event) => reject(event.target.error);
    });
  });
}
