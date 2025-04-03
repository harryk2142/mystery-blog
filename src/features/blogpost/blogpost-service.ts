import { getApp } from "../firebase/firebase";
import { getBlogpostByIdentifier, savePost } from "./blogpost-firebase-bridge";

const createBlogpost = async (blogPostIdentifier: string) => {
	const app = await getApp();
	const newPostID = await savePost(app, blogPostIdentifier);

	return newPostID;
};

const loadBlogpost = async (blogPostIdentifier: string) => {
	const app = await getApp();
	const newPostID = await getBlogpostByIdentifier(app, blogPostIdentifier);
	return newPostID;
};

export { createBlogpost, loadBlogpost };
