"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import LikeButton from "../LikeButton";
import LoadingSpinner from "../loadingSpinner";

export interface Post {
	id: number;
	title: string;
	thumbnailUrl: string;
}

const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
	console.log("fetchPost: ", pageParam);
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=10`
	);
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	return res.json();
};

export default function Feed() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
	} = useInfiniteQuery<Post[], Error>({
		queryKey: ["posts"],
		queryFn: ({ pageParam }) => fetchPosts({ pageParam: pageParam as number }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === 10 ? allPages.length + 1 : undefined;
		},
	});

	const router = useRouter();

	useEffect(() => {
		if (data?.pages) {
			const currentPage = data.pages.length;
			router.push(`?page=${currentPage}`);
		}
	}, [data?.pages]);

	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

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

	if (isLoading) return <LoadingSpinner />;
	if (status === "error") return <p>Error loading posts.</p>;

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 w-[630px] gap-4 p-4 items-center mb-5">
				{data?.pages.map((page, i) => (
					<div key={i}>
						{page.map((post: Post) => (
							<div
								key={post.id}
								className="p-4 border-b border-gray-300 w-[468px] pt-5 mx-auto"
							>
								<img
									src={post.thumbnailUrl}
									alt={post.title}
									className="h-[585px] object-cover mb-2 rounded"
								/>
								<div className="mt-4">
									<LikeButton />
								</div>
								<h3 className="text-lg font-semibold">{post.title}</h3>
								<p className="text-sm">{post.title}</p>
							</div>
						))}
					</div>
				))}
				<button
					ref={loadMoreButtonRef}
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					className="col-span-full mt-4 p-2 bg-blue-500 text-white rounded"
				>
					{isFetchingNextPage
						? "Loading more..."
						: hasNextPage
						? "Load More"
						: "No more posts"}
				</button>
			</div>
		</div>
	);
}
