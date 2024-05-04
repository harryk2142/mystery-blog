declare module "https://*";
declare module "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore-lite.js" {
  export {
    addDoc,
    collection,
    connectFirestoreEmulator,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    where,
  } from "firebase/firestore/lite";
}
declare module "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js" {
  export { FirebaseApp, initializeApp } from "firebase/app";
}
declare module "https://esm.sh/canvas-confetti" {
  export { default } from "canvas-confetti";
}
declare module "https://esm.sh/umbrellajs" {
  export { default } from "umbrellajs";
}
declare module "https://esm.sh/redom" {
  export { el, mount } from "redom";
}
