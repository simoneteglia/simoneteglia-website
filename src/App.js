import React, { useState } from "react";
import Landing from "./components/Landing";
import global from "./resources/global.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

import "./App.css";

export default function App() {
	return (
		<>
			{/* <CustomCursor /> */}
			<Socials />
			<div
				style={{
					width: "100vw",
					height: "100vh",
					backgroundColor: global.GUI.LIGHT_BLUE,
				}}
			>
				<Landing />
			</div>
		</>
	);
}

function CustomCursor() {
	const [clientX, setClientX] = useState(-200);
	const [clientY, setClientY] = useState(-200);
	const [distanceX, setDistanceX] = useState(50);
	const [centerX, setCenterX] = useState(50);
	const [centerY, setCenterY] = useState(50);

	document.addEventListener("mousemove", (e) => {
		setClientX(e.clientX);
		setClientY(e.clientY);
		const { x, y } = e;
		let distanceX =
			(Math.abs(x - window.innerWidth / 2) / (window.innerWidth / 2)) *
			100;
		setDistanceX(distanceX);

		let centerX = (x / window.innerWidth) * 100;
		setCenterX(100 - centerX);

		let centerY = (y / window.innerHeight) * 100;
		setCenterY(100 - centerY);
	});

	return <div className="cursor-dot"></div>;
}

function Socials() {
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
				/>
			</a>
		</div>
	);
}
