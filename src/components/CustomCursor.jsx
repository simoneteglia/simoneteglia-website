import React, { useState, useEffect } from "react";

export default function CustomCursor({ cursorCircleRef, cursorDotRef }) {
	const [clientX, setClientX] = useState(-200);
	const [clientY, setClientY] = useState(-200);
	const [distanceX, setDistanceX] = useState(50);
	const [centerX, setCenterX] = useState(50);
	const [centerY, setCenterY] = useState(50);

	useEffect(() => {
		document.addEventListener("mousemove", (e) => {
			setClientX(e.clientX);
			setClientY(e.clientY);
			const { x, y } = e;
			let distanceX =
				(Math.abs(x - window.innerWidth / 2) /
					(window.innerWidth / 2)) *
				100;
			setDistanceX(distanceX);

			let centerX = (x / window.innerWidth) * 100;
			setCenterX(100 - centerX);

			let centerY = (y / window.innerHeight) * 100;
			setCenterY(100 - centerY);
		});

		document.addEventListener("mousedown", (e) => {
			cursorCircleRef.current.classList.add("blurred");
			cursorDotRef.current.style.display = "none";
		});

		document.addEventListener("mouseup", (e) => {
			cursorCircleRef.current.classList.remove("blurred");
			cursorDotRef.current.style.display = "initial";
		});
	}, []);

	return (
		<div
			className="pointer"
			style={{
				position: "fixed",
				top: clientY,
				left: clientX,
				zIndex: 2000,
				pointerEvents: "none",
			}}
		>
			<div className="cursor-dot" ref={cursorDotRef}></div>
			<div className="cursor-dot bigger" ref={cursorCircleRef}></div>
		</div>
	);
}
