export interface PostModel {
	id: number;
	title: string;
	thumbnailUrl: string;
}

type FetchPostsOptions = {
	pageNumber?: number;
};

export const fetchPosts = async ({
	pageNumber = 1,
}: FetchPostsOptions): Promise<PostModel[]> => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=10`
	);
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	return res.json();
};
