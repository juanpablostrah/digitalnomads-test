"use client";

import Feed from "./feed/page";

export default function Home() {
	return (
		<div>
			<h1 className="text-center text-3xl font-bold mb-4">
				Instagram-Style Feed
			</h1>
			<Feed />
		</div>
	);
}
