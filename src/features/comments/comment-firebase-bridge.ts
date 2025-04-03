import { type FirebaseApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
	addDoc,
	collection,
	DocumentSnapshot,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
import { getApp } from "../firebase/firebase";

const sammlungName = "posts";

interface Comment {
	id: string;
	postID?: string;
	date: Date;
	formattedDate?: string;
	username: string;
	text: string;
	parentID?: string;
	replies?: Comment[];
}

const commentConverter = {
	toFirestore(comment: Comment) {
		return {
			date: comment.date,
			username: comment.username ?? "ANONYM",
			text: comment.text ?? "",
		};
	},
	fromFirestore(snapshot: DocumentSnapshot): Comment {
		const data = snapshot.data()! as Comment;
		const postID = snapshot.ref.parent.parent?.id;
		const id = snapshot.id;

		return {
			id: id,
			postID: postID,
			date: data.date ?? "0",
			formattedDate: new Date(data.date).toLocaleString(),
			username: data.username ?? "ANONYM",
			text: data.text ?? "",
			parentID: data.parentID ?? "",
			replies: [],
		};
	},
};
const getComments = async (app: FirebaseApp, postId: string) => {
	const db = getFirestore(app);

	const q = query(
		collection(db, sammlungName, postId, "comments").withConverter(commentConverter),
		orderBy("date"),
	);

	const d = await getDocs(q);

	const comments: Array<Comment> = [];
	d.forEach((doc) => {
		comments.push(doc.data());
	});
	return comments;
};
const addComment = async (
	app: FirebaseApp,
	postID: string,
	commentText: string,
	author: string,
) => {
	const db = getFirestore(app);
	const nComment = {
		date: Date.now(),
		username: author,
		text: commentText,
	};
	await addDoc(collection(db, sammlungName, postID, "comments"), nComment);
};

const addCommentReply = async (
	app: FirebaseApp,
	postID: string,
	parentCommentID: string,
	commentText: string,
	author: string,
) => {
	const db = getFirestore(app);
	const nComment = {
		date: Date.now(),
		username: author,
		text: commentText,
		parentID: parentCommentID,
	};
	await addDoc(collection(db, sammlungName, postID, "comments"), nComment);
};
const loadCommentsFromFirebase = async (postID: string) => {
	const app = await getApp();
	const comments = await getComments(app, postID);
	return comments;
};
const submitComment = async (postId: string, text: string, username: string) => {
	const app = await getApp();
	await addComment(app, postId, text, username);
};
const submitReply = async (
	postId: string,
	parentCommentId: string,
	text: string,
	username: string,
) => {
	const app = await getApp();
	await addCommentReply(app, postId, parentCommentId, text, username);
};
export {
	addComment,
	addCommentReply,
	getComments,
	loadCommentsFromFirebase,
	submitComment,
	submitReply,
};
export type { Comment };
