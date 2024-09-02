import { LegacyRef, useEffect, useRef, useState } from "react";

type UseVisibilityObserverResult<T extends HTMLElement> = {
	visible: boolean;
	ref: LegacyRef<T> | undefined;
};

export function useVisibilityObserver<
	T extends HTMLElement
>(): UseVisibilityObserverResult<T> {
	const [visible, setVisible] = useState(false);
	const [target, setTarget] = useState<T | null>();
	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				setVisible(() => entries[0].isIntersecting);
			},
			{ threshold: 0.1 }
		);
	}, []);

	useEffect(() => {
		const observer = observerRef.current;
		if (target && observer) {
			observer?.observe(target);
			return () => {
				if (target) {
					observer.unobserve(target);
				}
			};
		}
	}, [target, observerRef]);
	return {
		visible,
		ref: (next) => {
			setTarget(next);
		},
	};
}
