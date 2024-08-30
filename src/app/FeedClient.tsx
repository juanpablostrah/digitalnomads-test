"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPosts } from "./api/fetchPosts";
import LoadingSpinner from "./loadingSpinner";
import Post from "./Post";

export interface PostType {
	id: number;
	title: string;
	thumbnailUrl: string;
}

interface FeedClientProps {
	initialPosts: PostType[];
}

export default function FeedClient({ initialPosts }: FeedClientProps) {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
	} = useInfiniteQuery<PostType[], Error>({
		queryKey: ["posts"],
		queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === 10 ? allPages.length + 1 : undefined;
		},
		initialData: { pages: [initialPosts], pageParams: [1] }, // Use initial data from SSR
	});

	const [cantLike, setCantLike] = useState<number>(0);
	const router = useRouter();
	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (data?.pages) {
			const currentPage = data.pages.length;
			router.push(`?page=${currentPage}`, undefined, { shallow: true });
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

	if (isLoading) return <LoadingSpinner fetchNextPage={() => {}} />;
	if (status === "error") return <p>Error loading posts.</p>;

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 w-[630px] gap-4 p-4 items-center mb-5">
				{data?.pages.map((page, i) => (
					<div key={i}>
						{page.map((post: PostType) => (
							<Post
								key={post.id}
								post={post}
								setCantLike={setCantLike}
								cantLike={cantLike}
							/>
						))}
					</div>
				))}
				<LoadingSpinner
					loadMoreButtonRef={loadMoreButtonRef}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
					hasNextPage={hasNextPage}
				/>
			</div>
		</div>
	);
}
