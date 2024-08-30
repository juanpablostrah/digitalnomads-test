import axios from "axios";
import Link from "next/link";
import { PostType } from "../../pages/feed/page";

export const dynamic = "force-dynamic";

interface FeedServerProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function FeedServer({ searchParams }: FeedServerProps) {
	const page = Number(searchParams.page) || 1;
	console.log("server side render");

	const res = await axios.get(
		`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
	);
	const posts: PostType[] = res.data;

	return (
		<div className="p-4 bg-cyan-800">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{posts.map((post) => (
					<div key={post.id} className="border p-4">
						<img
							src={post.thumbnailUrl}
							alt={post.title}
							className="w-full h-40 object-cover mb-2"
						/>
						<h3 className="text-lg font-semibold">{post.title}</h3>
						<p className="text-sm">{post.title}</p>
						<button className="mt-2 text-blue-500">Like</button>
					</div>
				))}
			</div>
			<div className="mt-4 flex justify-between">
				<Link
					href={`/feed-server?page=${page - 1}`}
					className={`p-2 bg-blue-500 text-white rounded ${
						page <= 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					Previous
				</Link>
				<Link
					href={`/feed-server?page=${page + 1}`}
					className="p-2 bg-blue-500 text-white rounded"
				>
					Next
				</Link>
			</div>
		</div>
	);
}
