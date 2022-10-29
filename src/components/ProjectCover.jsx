import React, { Component, useEffect, useRef } from "react";
import "../resources/styles.css";

export default function ProjectCover({ projectToShow }) {
	const ascoltaleRef = useRef();
	const robotRef = useRef();
	const scaRef = useRef();
	const cssRef = useRef();

	useEffect(() => {
		if (ascoltaleRef && robotRef && scaRef && cssRef)
			switch (projectToShow) {
				case "ascoltale":
					ascoltaleRef.current.classList.remove("hide-project");
					ascoltaleRef.current.classList.add("show-project");
					break;
				case "css art":
					cssRef.current.classList.remove("hide-project");
					cssRef.current.classList.add("show-project");
					break;
				default:
					ascoltaleRef.current.classList.add("hide-project");
					cssRef.current.classList.add("hide-project");
			}
	}, [projectToShow]);

	const style = {
		borderRadius: "4em",
		transition: "all 0.4s ease-out",
		position: "absolute",
		height: "100%",
		width: "100%",
		maxWidth: "500px",
	};

	return (
		<>
			<img
				ref={cssRef}
				className="hide-project"
				src={require("../resources/gifs/coin-gif.gif")}
				alt="css art"
				style={style}
			/>
			<img
				ref={ascoltaleRef}
				className="hide-project"
				src={require("../resources/gifs/ascoltale.png")}
				alt="css art"
				style={style}
			/>
		</>
	);
}
