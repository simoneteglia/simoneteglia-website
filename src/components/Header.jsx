import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const akiraFont = "Akira";

export default function Header({ title }) {
	return (
		<div
			style={{
				width: "100%",
				height: "30vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "60px",
				fontFamily: akiraFont,
				color: "yellow",
				position: "relative",
			}}
		>
			<h1 className="text">{title}</h1>
			<Link
				to="/"
				style={{ position: "absolute", left: "3vw", color: "yellow" }}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
		</div>
	);
}
