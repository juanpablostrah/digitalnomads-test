"use client";

import React, { useEffect } from "react";

interface LoadingSpinnerProps {
	loadMoreButtonRef?: any;
	fetchNextPage: () => any;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;
}

const LoadingSpinner = ({
	loadMoreButtonRef,
	fetchNextPage,
	isFetchingNextPage,
	hasNextPage,
}: LoadingSpinnerProps) => {
	return (
		<div className="flex justify-center items-center ">
			{isFetchingNextPage || hasNextPage ? (
				<button
					ref={loadMoreButtonRef}
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"
				/>
			) : (
				<p>No more posts</p>
			)}
		</div>
	);
};

export default LoadingSpinner;
