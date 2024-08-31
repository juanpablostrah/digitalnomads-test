import { Suspense } from "react";
import { fetchPosts } from "../api/fetchPosts";
import { Paginator } from "./paginator";
import { Posts } from "./posts";

export default async function FeedPage({
	searchParams,
}: {
	searchParams: { page?: string };
}) {
	const { page } = searchParams;
	const parsedPage = page ? parseInt(page) : 1;
	const pageNumber = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

	const posts = await fetchPosts({ pageParam: pageNumber });

	return (
		<div>
			<Posts posts={posts} />
			<Suspense>
				<Paginator />
			</Suspense>
		</div>
	);
}
