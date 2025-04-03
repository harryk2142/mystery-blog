import { el, mount } from "https://esm.sh/redom";
import { type Comment } from "./comment-firebase-bridge";
import { createCommentForm } from "./commentForm";

const addRepliesToContainer = (createdBox: HTMLDivElement, comments: Comment[]) => {
	const repliesContainer = el("div.comment-replies");
	comments.forEach((element) => {
		const comentDiv = createCommentBox(element);
		mount(repliesContainer, comentDiv);
	});

	mount(createdBox, repliesContainer);
};

const createCommentBox = (comment: Comment) => {
	const createdCommentBox = el("div", { class: "comment-block" }, [
		el("span.comment-username", comment.username),
		el("div", [
			el("span", "schrieb am "),
			el("span.comment-date", comment.formattedDate ?? ""),
		]),
		el("div", el("span.comment-text", comment.text)),
		el(
			"div",
			el(
				"button.reply-btn#reply-btn-" + comment.id,
				{
					onclick: clickAntworten,
				},
				"Antworten",
			),
		),
	]);
	if (comment.replies && comment.replies.length > 0) {
		addRepliesToContainer(createdCommentBox, comment.replies);
	}
	return createdCommentBox;
};

const clickAntworten = (event: MouseEvent) => {
	let blogPostId = (document.querySelector("#blog-post-id") as HTMLElement).innerText;
	const target = event.target as HTMLElement;
	const targetId = target.id;
	const id = targetId.split("-").at(targetId.split("-").length - 1);
	const box = el("div#reply-box-" + id);

	createCommentForm(box, blogPostId, id);
	mount(target.parentNode as HTMLElement, box);
};

export { createCommentBox };
