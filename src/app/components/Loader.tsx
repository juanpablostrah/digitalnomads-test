"use client";
import {
	InfiniteData,
	QueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchPosts, PostModel } from "../api/fetchPosts";
import { useVisibilityObserver } from "../hooks/useVisibilityObserver";
import { Post } from "./Post";

type LoaderProps = {
	initialPage: number;
};

const queryClient = new QueryClient();

//https://github.com/vercel/next.js/discussions/48110
function setQueryParameter(pageParam: number) {
	const url = new URL(window.location.href);
	url.searchParams.set("page", `${pageParam}`);
	history.pushState({}, "", url);
}

export function Loader({ initialPage }: LoaderProps) {
	// Allows content to fill the page and move fetch trigger outside viewport
	// before fetching new page
	const [renderingPage, setRenderingPage] = useState(false);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery<
			PostModel[],
			Error,
			InfiniteData<PostModel[]>,
			[string],
			number
		>(
			{
				queryKey: ["posts"],
				initialPageParam: initialPage,
				queryFn({ pageParam }) {
					let pageParamAux = pageParam === 1 ? pageParam : pageParam - 1;
					setQueryParameter(pageParamAux);
					return fetchPosts({ pageNumber: pageParamAux });
				},
				getNextPageParam(lastPage, _allPages, lastPageParam) {
					return lastPage.length === 10 ? lastPageParam + 1 : undefined;
				},
				retry: 2,
				retryDelay: 1000,
			},
			queryClient
		);
	const { visible, ref } = useVisibilityObserver<HTMLButtonElement>();

	useEffect(() => {
		if (visible && hasNextPage && !isFetchingNextPage && !renderingPage) {
			fetchNextPage();
			setRenderingPage(true);
		}
	}, [visible, hasNextPage, isFetchingNextPage, fetchNextPage, renderingPage]);

	useEffect(() => {
		if (!isFetchingNextPage) {
			setTimeout(setRenderingPage, 1, false);
		}
	}, [isFetchingNextPage]);

	return (
		<div>
			{data?.pages
				.map((page) => page.map((post) => <Post post={post} key={post.id} />))
				.flat()}
			<div className="w-8 mx-auto">
				{hasNextPage ? (
					<button
						ref={ref}
						className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"
					/>
				) : (
					<p>No more posts</p>
				)}
			</div>
		</div>
	);
}
