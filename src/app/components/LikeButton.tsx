import React, { useState } from "react";

interface LikeButtonProps {
	setCantLike: (func: (prevCantLike: number) => number) => void;
	cantLike: number;
}

const LikeButton = ({ setCantLike }: LikeButtonProps) => {
	const [liked, setLiked] = useState<boolean>(false);

	const handleLike = () => {
		setCantLike((prevCantLike: number) =>
			!liked ? prevCantLike + 1 : prevCantLike - 1
		);
		setLiked(!liked);
	};

	const xmlns = "http://www.w3.org/2000/svg";

	return (
		<button onClick={handleLike} className="focus:outline-none">
			{liked ? (
				<svg
					xmlns={xmlns}
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6 text-red-500"
				>
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</svg>
			) : (
				<svg
					xmlns={xmlns}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					className="w-6 h-6 text-black hover:text-gray-500"
					strokeWidth="2"
				>
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</svg>
			)}
		</button>
	);
};

export default LikeButton;
