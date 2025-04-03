import { getBlogpostById } from "../blogpost/blogpost-firebase-bridge";
import { getApp } from "../firebase/firebase";
import { like } from "./like-firebase-bridge";

const loadLikes = async (postID: string) => {
	const app = await getApp();
	const post = await getBlogpostById(app, postID);
	if (post?.likes) {
		(document.querySelector("#like-counter") as HTMLElement).innerText =
			post.likes + "";
	}
};
const submitLike = async (postID: string) => {
	const app = await getApp();
	const likes = like(app, postID);
	return likes;
};

export { loadLikes, submitLike };
