import React, { useState, useRef, useEffect } from "react";
import Landing from "./components/Landing";
import global from "./resources/global.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

import "./resources/styles.css";
import "./App.css";

export default function App() {
	const cursorDotRef = useRef();
	const cursorCircleRef = useRef();

	return (
		<>
			<Socials
				cursorDotRef={cursorDotRef}
				cursorCircleRef={cursorCircleRef}
			/>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					backgroundColor: global.GUI.LIGHT_BLUE,
				}}
			>
				<CustomCursor
					cursorDotRef={cursorDotRef}
					cursorCircleRef={cursorCircleRef}
				/>
				<Landing />
			</div>
		</>
	);
}

function CustomCursor({ cursorCircleRef, cursorDotRef }) {
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

function Socials({ cursorDotRef, cursorCircleRef }) {
	function handleMouseEnter() {
		cursorCircleRef.current.classList.add("blurred");
		cursorDotRef.current.style.display = "none";
	}

	function handleMouseLeave() {
		cursorCircleRef.current.classList.remove("blurred");
		cursorDotRef.current.style.display = "initial";
	}

	return (
		<div
			style={{
				position: "fixed",
				bottom: 10,
				right: 10,
				color: "#fff",
				zIndex: 2000,
				display: "flex",
				gap: "30px",
				padding: "30px",
				pointerEvents: "none",
			}}
		>
			<a
				href="https://www.linkedin.com/in/simone-teglia/"
				aria-label="linkedin-link"
				style={{ pointerEvents: "initial" }}
			>
				<FontAwesomeIcon
					icon={faLinkedin}
					size="xl"
					className="brand-icon"
					onMouseEnter={() => handleMouseEnter()}
					onMouseLeave={() => handleMouseLeave()}
				/>
			</a>

			<a
				href="https://github.com/simoneteglia"
				aria-label="github-link"
				style={{ pointerEvents: "initial" }}
			>
				<FontAwesomeIcon
					icon={faGithub}
					size="xl"
					className="brand-icon"
					onMouseEnter={() => handleMouseEnter()}
					onMouseLeave={() => handleMouseLeave()}
				/>
			</a>
			<a
				href="https://twitter.com/Enimoss9"
				aria-label="twitter-link"
				style={{ pointerEvents: "initial" }}
			>
				<FontAwesomeIcon
					icon={faTwitter}
					size="xl"
					className="brand-icon"
					onMouseEnter={() => handleMouseEnter()}
					onMouseLeave={() => handleMouseLeave()}
				/>
			</a>
		</div>
	);
}
