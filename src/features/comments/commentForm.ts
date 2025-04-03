import { el, mount } from "https://esm.sh/redom";
import u from "https://esm.sh/umbrellajs";
import { submitComment, submitReply } from "./comment-firebase-bridge";

const clickAbsenden = async (event: MouseEvent) => {
	(event.target as HTMLButtonElement).disabled = true;
	const parent = u(event.target as HTMLElement)
		.parent()
		.parent();
	const protection = parent.find("[name='protection']").first() as HTMLInputElement;
	const protectionValue = protection.value;

	if (protectionValue) {
		console.error("ERROR");
	}

	const blogpost = parent.find("[name='blog-post']").first() as HTMLInputElement;
	const blogpostId = blogpost.value;

	const parentComment = parent
		.find("[name='parent-comment']")
		.first() as HTMLInputElement;
	const parentCommentId = parentComment.value;

	const inputUsername = parent
		.find("[name='input-username']")
		.first() as HTMLInputElement;
	let inputUsernameValue = inputUsername.value;

	const iputText = parent.find("[name='input-text']").first() as HTMLInputElement;
	const inputTextValue = iputText.value;

	if (!inputTextValue) {
		console.warn("EMPTY INPUT");
		return;
	}

	if (!inputUsernameValue) {
		inputUsernameValue = "ANONYM";
	}

	if (inputTextValue) {
		if (parentCommentId) {
			await submitReply(
				blogpostId,
				parentCommentId,
				inputTextValue,
				inputUsernameValue,
			);
		} else {
			await submitComment(blogpostId, inputTextValue, inputUsernameValue);
		}
		setTimeout(() => {
			window.location.reload();
		}, 500);
	}
};
const clickAbbrechen = (event: MouseEvent) => {
	const id = (event.target as HTMLElement).id
		.split("-")
		.at((event.target as HTMLElement).id.split("-").length - 1);
	const box = document.querySelector("#reply-box-" + id);
	const parent = box?.parentElement;

	if (parent && box) {
		parent.removeChild(box);
	}
};
const createCommentForm = (
	htmlParent: Element,
	blogPostId: string,
	parentCommentId: string = "",
) => {
	const parentId = parentCommentId ? parentCommentId : blogPostId;

	const idProtection = "protection-" + parentId;
	const idBlogPost = "blog-post-" + parentId;
	const idParentComment = parentCommentId ? "parent-comment-" + parentCommentId : "";
	const idUsernameInput = "input-username-" + parentId;
	const idTextInput = "input-text-" + parentId;
	const idAbsendenButton = "senden-btn-" + parentId;
	const idAbbrechenButton = "abbrechen-btn-" + parentId;

	const result = el("div", { class: "comment-form" }, [
		el("input", {
			type: "hidden",
			id: idProtection,
			name: "protection",
		}),
		el("input", {
			type: "hidden",
			id: idBlogPost,
			name: "blog-post",
			value: blogPostId,
		}),
		parentCommentId &&
			el("input", {
				type: "hidden",
				id: idParentComment,
				name: "parent-comment",
				value: parentCommentId,
			}),
		el(
			"label",
			{
				id: "lbl-input-username",
				for: idUsernameInput,
			},
			"Username (optional):",
		),
		el("input", {
			type: "text",
			id: idUsernameInput,
			name: "input-username",
			autocomplete: "off",
			placeholder: "Anonym",
			class: "username",
		}),
		el("label", { id: "lbl-input-text", for: idTextInput }, "Kommentar:"),
		el("textarea", {
			id: idTextInput,
			name: "input-text",
			cols: 45,
			rows: 8,
			placeholder: "Hier eingeben...",
			autocomplete: "off",
			class: "text",
		}),
		el("div", { class: "comment-form-btn-block" }, [
			parentCommentId &&
				el(
					"button",
					{
						id: idAbbrechenButton,
						name: idAbbrechenButton,
						type: "button",
						class: "abbrechen-btn",
						onclick: clickAbbrechen,
					},
					"Abbrechen",
				),
			el(
				"button",
				{
					id: idAbsendenButton,
					name: idAbsendenButton,
					type: "button",
					class: "absenden-btn",
					onclick: clickAbsenden,
				},
				"Absenden",
			),
		]),
	]);

	mount(htmlParent, result);
};

export { createCommentForm };
