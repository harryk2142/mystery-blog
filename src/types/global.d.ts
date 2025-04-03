declare module "https://*";
declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js" {
	export {
		DocumentSnapshot,
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
declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js" {
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
declare module "@pagefind/default-ui" {
	declare class PagefindUI {
		constructor(arg: any);
	}
}
