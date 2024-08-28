import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"></div>
		</div>
	);
};

export default LoadingSpinner;
