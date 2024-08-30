import React from "react";
import LikeButton from "./LikeButton";
import { PostType } from "./FeedClient";

interface PostProps {
	post: PostType;
	setCantLike: (func: (prevCantLike: number) => number) => void;
	cantLike: number;
}

const Post = ({
	post: { id, thumbnailUrl, title },
	setCantLike,
	cantLike,
}: PostProps) => {
	return (
		<div
			key={id}
			className="p-4 border-b border-gray-300 w-[468px] pt-5 mx-auto"
		>
			<img
				src={thumbnailUrl}
				alt={title}
				className="h-[585px] object-cover mb-2 rounded"
			/>
			<div className="flex gap-4 mt-4">
				<LikeButton setCantLike={setCantLike} cantLike={cantLike} />
				{cantLike}
			</div>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm">{title}</p>
		</div>
	);
};

export default Post;
