"use client";

import React, { useState } from "react";
import LikeButton from "../likeButton";
import Image from "next/image";

export interface PostModel {
	id: number;
	title: string;
	thumbnailUrl: string;
}
interface PostProps {
	post: PostModel;
}

const Post = ({ post: { id, thumbnailUrl, title } }: PostProps) => {
	const [cantLike, setCantLike] = useState<number>(0);
	return (
		<div
			key={id}
			className="p-4 border-b border-gray-300 w-[468px] pt-5 mx-auto"
		>
			<div className="h-[585px] w-[436px] relative mb-2 rounded overflow-hidden">
				<Image
					src={thumbnailUrl}
					alt={title}
					fill
					className="object-cover rounded"
					unoptimized
				/>
			</div>
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
