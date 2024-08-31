"use client";

import Post, { PostModel } from "./post";

type PostsProps = {
	posts: PostModel[];
};

export function Posts({ posts }: PostsProps) {
	return (
		<div>
			{posts.map((post: PostModel) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
}
