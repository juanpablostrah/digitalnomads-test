import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { fetchPosts } from "./app/api/fetchPosts";
import { PostModel } from "./app/feed-async/post";

export function useInfinitePosts() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
	} = useInfiniteQuery<PostModel[], Error>({
		queryKey: ["posts"],
		queryFn: ({ pageParam = 1 }) =>
			fetchPosts({ pageParam: pageParam as number }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === 10 ? allPages.length + 1 : undefined;
		},
	});

	const router = useRouter();
	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (data?.pages) {
			const currentPage = data.pages.length;
			router.push(`?page=${currentPage}`, undefined);
		}
	}, [data?.pages, router]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 1 }
		);

		if (loadMoreButtonRef.current) {
			observer.observe(loadMoreButtonRef.current);
		}

		return () => {
			if (loadMoreButtonRef.current) {
				observer.unobserve(loadMoreButtonRef.current);
			}
		};
	}, [hasNextPage, fetchNextPage]);

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
		loadMoreButtonRef,
	};
}
