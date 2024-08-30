import React from "react";

export async function getPage(pageNumber: number) {
	const from = pageNumber * 10;
	const to = (pageNumber + 1) * 10;
	await new Promise((res) => {
		setTimeout(res, 2000);
	});
	return Array.from(Array(to - from).keys()).map((x) => x + from);
}
