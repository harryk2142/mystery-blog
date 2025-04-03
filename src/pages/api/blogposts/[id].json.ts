import type { APIRoute } from "astro";
import blogposts from "./_blogposts.json";

interface Parameter {
	params: { id: number };
}
export const GET: APIRoute = ({ params }) => {
	const id = params.id as string;
	return new Response(JSON.stringify(blogposts[Number(id)]), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
export function getStaticPaths() {
	const ids: Parameter[] = [];
	for (let index = 0; index < blogposts.length; index++) {
		ids.push({
			params: {
				id: index,
			},
		});
	}
	return ids;
}
