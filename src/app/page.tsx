import FeedPage from "./feed-async/page";

export default function Home() {
	const initialPage = "1";
	return (
		<div>
			<h1 className="text-center text-3xl font-bold mb-4 mt-8">
				Instagram Feed
			</h1>
			<FeedPage searchParams={{ page: initialPage }} />
		</div>
	);
}
