"use client";
import { useState } from "react";

type PostsProps = {
	content: number[];
};

export function Posts({ content }: PostsProps) {
	return (
		<div>
			{content.map((x) => (
				<div>{x}</div>
			))}
		</div>
	);
}
