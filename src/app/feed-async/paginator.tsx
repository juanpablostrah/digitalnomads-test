"use client";
import { useEffect, useRef, useState } from "react";
import { getPage } from "./post-service";
import { Posts } from "./posts";

type PostsProps = {
	pageNumber: number;
};

export function Paginator({ pageNumber }: PostsProps) {
	const [pages, setpages] = useState<number[][]>([]);
	const pageNumberRef = useRef(pageNumber);
	useEffect(() => {
		const timer = setInterval(async () => {
			const current = pageNumberRef.current;
			pageNumberRef.current++;
			const nextPage = await getPage(current);
			setpages((pages) => [...pages, nextPage]);
		}, 2000);
		return () => clearInterval(timer);
	}, []);
	return (
		<div>
			{/*aca va el loading*/}
			<div>paginator</div>
			<div>
				{pages.map((page) => (
					<Posts content={page} />
				))}
			</div>
		</div>
	);
}
