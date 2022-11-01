import React, { useState, useRef, useEffect } from "react";
import Landing from "./components/Landing";
import global from "./resources/global.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import script from "./python/pixelator.py";
import CustomCursor from "./components/CustomCursor";
import PixelatorPage from "./components/PixelatorPage";

import "./resources/styles.css";
import "./App.css";

export default function App() {
	const [output, setOutput] = useState("loading...");
	const cursorDotRef = useRef();
	const cursorCircleRef = useRef();

	return (
		<>
			<Socials
				cursorDotRef={cursorDotRef}
				cursorCircleRef={cursorCircleRef}
			/>
			<WIP />
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
				<Landing
					cursorDotRef={cursorDotRef}
					cursorCircleRef={cursorCircleRef}
				/>
			</div>
		</>
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

function WIP() {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				height: "100vh",
				width: "100vw",
				color: "red",
				opacity: 0.3,
				fontSize: "4.5vw",
				zIndex: 2000,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				pointerEvents: "none",
				rotate: "-30deg",
			}}
		>
			<h1>WORK IN PROGRESS</h1>
		</div>
	);
}

// const runScript = async (code) => {
// 	const pyodide = await window.loadPyodide({
// 		indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
// 	});

// 	return await pyodide.runPythonAsync(code);
// };

// useEffect(() => {
// 	const run = async () => {
// 		const scriptText = await (await fetch(script)).text();
// 		const out = await runScript(scriptText);
// 		setOutput(out);
// 	};
// 	run();
// }, []);
