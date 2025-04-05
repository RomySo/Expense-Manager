(function () {
  const STORE_NAME = "CostManagement"; // Name of the object store

  window.idb = {
    openCostsDB: function (dbName, version) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onupgradeneeded = function (event) {
          const db = event.target.result;
          console.log("Upgrading database...");

          // Check if the store doesn't exist before creating
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, {
              keyPath: "id",
              autoIncrement: true,
            });
            console.log("Object store created.");
          }
        };

        request.onsuccess = function (event) {
          const db = event.target.result;
          console.log("Database opened successfully.");

          // Ensure that the object store exists
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            reject(new Error("Object store is missing!"));
            return;
          }

          // Define an API with an addCost method
          const api = {
            addCost: function (cost) {
              return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORE_NAME, "readwrite");
                const store = transaction.objectStore(STORE_NAME);
                const addRequest = store.add(cost);

                addRequest.onsuccess = function (event) {
                  resolve(event.target.result);
                };

                addRequest.onerror = function (event) {
                  reject(event.target.error);
                };
              });
            },
          };

          resolve(api);
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
  };
})();
