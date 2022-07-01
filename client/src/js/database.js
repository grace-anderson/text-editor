import { openDB } from "idb";

// create indexdb database
const initdb = async () =>
  //create database named jate, use version 1 of jate database
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//Accept content and add it to the database
export const putDb = async (content) => {
  console.log("PUT to jate database");
  //connect to version 1 of jate db
  const jateDb = await openDB("jate", 1);
  //create transaction and add content to jate db
  const tx = jateDb.transaction("jate", "readwrite");
  //get object store
  const store = tx.objectStore("jate");
  // Use the .put() method on the store and pass in the content.
  const result = await store.put({ id: 1, content: content });
  // Get confirmation of  request.
  console.log("🚀 - data saved to the database", result);
};

// Get all the content from the database
export const getDb = async () => {
  console.log("GET from jate database");
  //connect to version 1 of jate db
  const jateDb = await openDB("jate", 1);
  //create transaction specifyin database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  //open up object store
  const store = tx.objectStore("jate");
  //get all the data from the jate object store
  const result = await store.getAll();
  console.log("result.value", result);
  return result?.content;
};

//start the database
initdb();
