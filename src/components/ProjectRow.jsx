import React, { useState } from "react";
import softIcon from "../resources/gifs/soft-icon.png";
import { Link } from "react-router-dom";
import "../resources/styles.css";

export default function ProjectRow(
	{ title, bgColor, setProjectToShow, cursorCircleRef, cursorDotRef, path },
	context
) {
	return (
		<Link
			to={path}
			className="project-row"
			style={{
				fontSize: "1.8em",
				borderBottom: "2px solid yellow",
				display: "flex",
				alignItems: "center",
				height: "100px",
				cursor: "pointer",
				color: "yellow",
			}}
			onMouseEnter={() => {
				setProjectToShow(title);
				cursorCircleRef.current.classList.add("blurred");
				cursorDotRef.current.style.display = "none";
			}}
			onMouseLeave={() => {
				cursorCircleRef.current.classList.remove("blurred");
				cursorDotRef.current.style.display = "initial";
			}}
			onClick={() => {
				switch (title) {
					case "ascoltale":
						window.location.href = "https://ascoltale.vercel.app";
				}
			}}
		>
			<p className="text project-row-text">
				<img
					className="soft-icon"
					src={softIcon}
					width="50px"
					style={{ translate: "0 6px 0" }}
				/>
				{title}
			</p>
		</Link>
	);
}
