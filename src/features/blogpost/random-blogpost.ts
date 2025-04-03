import { el, mount } from "https://esm.sh/redom";

import u from "https://esm.sh/umbrellajs";

const blogPostsCounter = 27;

interface BlogPost {
	title: string;
	headline: string;
	img: string;
	alt: string;
	pubDate: string;
	url: string;
}
const getRandomBlogPosts = async (counter: number): Promise<BlogPost[]> => {
	// 21 - 4 - counter = start
	// 0 - 4 Reserviert
	// 5 - max Erlaubt
	// Aktuell Max 21
	const notForRandom = 1;
	const start = blogPostsCounter - notForRandom - counter;
	const randomStart = Math.floor(Math.random() * start) + notForRandom;

	const randomBlogPosts: BlogPost[] = [];
	for (let index = randomStart; index < counter + randomStart; index++) {
		const response = await fetch("./api/blogposts/" + index + ".json");
		const blogPost = (await response.json()) as BlogPost;
		randomBlogPosts.push(blogPost);
	}

	return randomBlogPosts;
};

const setRandomBlogpostUmbrella = async (parentId: string) => {
	const blogPosts = await getRandomBlogPosts(1);
	const blogPost = blogPosts[0];

	const pubDate = new Date(blogPost.pubDate);
	const pubDateIso = pubDate.toISOString();
	const pubDateHtml = pubDate.toLocaleDateString("de-de", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const result = u("<a>")
		.attr("href", "blog/" + blogPost.url)
		.append(
			u("<div>")
				.append(
					u("<div>").append(
						u("<img>").addClass("latest-post-list-item-img").attr({
							src: blogPost.img,
							alt: blogPost.alt,
						}),
					),
				)
				.append(
					u("<div>").append(
						u("<div>")
							.addClass("latest-post-list-item-content")
							.append(
								u("<div>")
									.addClass("latest-post-list-item-date")
									.append(
										u("<time>")
											.addClass("latest-post-list-item-date")
											.attr("dateTime", pubDateIso)
											.html(pubDateHtml),
									),
							)
							.append(u("<span>").text(blogPost.headline + "###")),
					),
				),
		);
	u("#" + parentId).append(result);
};

const setRandomBlogpost = async (parentId: string) => {
	const blogPosts = await getRandomBlogPosts(1);
	const blogPost = blogPosts[0];

	const pubDate = new Date(blogPost.pubDate);
	const pubDateIso = pubDate.toISOString();
	const pubDateHtml = pubDate.toLocaleDateString("de-de", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const result = el(
		"a",
		{ href: "blog/" + blogPost.url },
		el(
			"div",
			{ class: "card-container" },
			el("div", { class: "card" }, [
				el(
					"div",
					{ class: "card-image-container" },
					el(
						"div",
						{ class: "card-image-box" },
						el("img", {
							class: "card-image",
							src: blogPost.img,
							alt: blogPost.alt,
						}),
					),
				),
				el(
					"div",
					{
						class: "card-content",
					},
					[
						el(
							"p",
							el(
								"time",
								{
									class: "latest-post-list-item-date",
									dateTime: pubDateIso,
								},
								pubDateHtml,
							),
						),
						el("p", blogPost.title),
					],
				),
			]),
		),
	);

	const parent = document.querySelector("#" + parentId);
	if (parent) {
		mount(parent, result);
	}
};
export { getRandomBlogPosts, setRandomBlogpost, setRandomBlogpostUmbrella };
