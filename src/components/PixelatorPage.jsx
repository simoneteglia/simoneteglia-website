import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../resources/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function PixelatorPage({}) {
	const pageRef = useRef();
	const textRef = useRef();
	useEffect(() => {
		const container = document.getElementById("pixelator-page");
		if (container) container.scrollIntoView();
		if (pageRef) {
			pageRef.current.style.opacity = 1;
		}
	}, []);

	return (
		<div
			ref={pageRef}
			id="pixelator-page"
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "0 3vw",
				opacity: 0,
				transition: "all 0.5s ease-out",
			}}
		>
			<Header title={"pixelator"} />
			<div className="description">
				<p className="text">
					Pixelator is a little python program that takes a photo as
					input and returns a pixelated version of it. I created this
					program when trying to create some fancy{" "}
					<Link
						to="/css-art"
						style={{
							textDecoration: "underline",
							color: "deeppink",
						}}
					>
						css pixel art
					</Link>
				</p>
			</div>
		</div>
	);
}
