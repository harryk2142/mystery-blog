
import type { FirebaseApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { getBlogpostById } from "../blogpost/blogpost-firebase-bridge";

const like = async (app: FirebaseApp, postID: string) => {
	const db = getFirestore(app);
	const post = await getBlogpostById(app, postID);

	if (post) {
		post.likes++;
		const likes = post.likes;
		await setDoc(doc(db, "posts", postID), post);
		return likes;
	}
	return 0;
};

export { like };
