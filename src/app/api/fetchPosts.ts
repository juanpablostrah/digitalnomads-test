export const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
	console.log("entra getPosts");
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=10`
	);
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	return res.json();
};
