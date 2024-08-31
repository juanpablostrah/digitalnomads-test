"use client";
import { useInfinitePosts } from "@/useInfinitePosts";
import LoadingSpinner from "../loadingSpinner";

export function Paginator() {
	const { loadMoreButtonRef, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useInfinitePosts();
	return (
		<div>
			<LoadingSpinner
				loadMoreButtonRef={loadMoreButtonRef}
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</div>
	);
}
