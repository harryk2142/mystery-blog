import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
import {type FirebaseApp} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

const sammlungName = "posts";

interface Post {
    id: string;
    blogPostIdentifier: string;
    likes: number;
}

const blogpostConverter = {
    toFirestore(post: Post) {
        return {title: post.blogPostIdentifier, likes: post.likes};
    },
    fromFirestore(snapshot: DocumentSnapshot): Post {
        const data = snapshot.data()!;
        const id = snapshot.id;
        return {
            id: id,
            blogPostIdentifier: data.blogPostIdentifier ?? "no title",
            likes: data.likes ?? 0,
        };
    },
};
const getBlogpostByIdentifier = async (
    app: FirebaseApp,
    blogPostIdentifier: string
): Promise<Post | undefined> => {
    const db = getFirestore(app);
    if (location.hostname === "localhost") {
        connectFirestoreEmulator(db, "127.0.0.1", 8088);
    }

    const q = query(
        collection(db, sammlungName).withConverter(blogpostConverter),
        where("blogPostIdentifier", "==", blogPostIdentifier)
    );
    const querySnapshot = await getDocs(q);

    const ref = querySnapshot.docs.at(0)?.ref;
    if (ref) {
        const doc = await getDoc(ref);

        const data = doc.data();
        return data;
    }
    return undefined;
};
const getBlogpostById = async (app: FirebaseApp, id: string): Promise<Post | undefined> => {
    const db = getFirestore(app);
    const ref = doc(db, sammlungName, id).withConverter(blogpostConverter);

    if (ref) {
        const snapshot = await getDoc(ref);
        const data = snapshot.data();
        return data;
    }
    return undefined;
};

const savePost = async (app: FirebaseApp, blogPostIdentifier: string) => {
    const db = getFirestore(app);

    const q = query(
        collection(db, sammlungName).withConverter(blogpostConverter),
        where("blogPostIdentifier", "==", blogPostIdentifier)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
        const post = {blogPostIdentifier: blogPostIdentifier, likes: 0};
        const id = (await addDoc(collection(db, sammlungName), post)).id;
        return id;
    }
    return "0";
};
export type {Post};
export {
    blogpostConverter,
    getBlogpostByIdentifier,
    getBlogpostById,
    savePost,
};
