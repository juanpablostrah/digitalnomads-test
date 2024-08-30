import { Suspense } from "react";
import { Posts } from "./posts";
import { getPage } from "./post-service";
import { Paginator } from "./paginator";

interface FeedServerProps {
	searchParams: {
		page?: string;
	};
}

export default async function FeedPage({
	searchParams: { page },
}: FeedServerProps) {
	const parsedPage = page ? parseInt(page) : 0;
	const pageNumber = isNaN(parsedPage) ? 0 : parsedPage;
	const content = await getPage(pageNumber);
	return (
		<div>
			<div>my feed</div>
			<Posts content={content} />
			<Suspense fallback={<span>loading</span>}>
				<Paginator pageNumber={pageNumber + 1} />
			</Suspense>
		</div>
	);
}
