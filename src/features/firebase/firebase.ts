import { initializeApp, type FirebaseApp } from "firebase/app";

let firebaseApp: FirebaseApp;

export const getApp = async () => {
	if (firebaseApp) {
		return firebaseApp;
	}
	firebaseApp = await initApp();
	return firebaseApp;
};

export const initApp = async () => {
	const config = {
		apiKey: FB_API_KEY,
		projectId: FB_PROJECT_ID,
	};
	const app = initializeApp(config);
	firebaseApp = app;
	return app;
};
