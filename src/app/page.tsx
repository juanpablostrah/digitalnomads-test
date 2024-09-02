import { Suspense } from "react";
import { fetchPosts, PostModel } from "./api/fetchPosts";
import { Loader } from "./components/Loader";
import { Post } from "./components/Post";

type HomeProps = {
	searchParams: { page?: string };
};

export default async function Home({ searchParams }: HomeProps) {
	const { page } = searchParams;
	const parsedPage = page ? parseInt(page) : 1;
	const pageNumber = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
	const posts = await fetchPosts({
		pageNumber,
	});
	return (
		<div>
			{posts.map((post: PostModel) => (
				<Post key={post.id} post={post} />
			))}
			<Suspense>
				<Loader initialPage={pageNumber + 1} />
			</Suspense>
		</div>
	);
}
