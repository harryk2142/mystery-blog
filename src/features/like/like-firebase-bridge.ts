import { type FirebaseApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore-lite.js";
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
