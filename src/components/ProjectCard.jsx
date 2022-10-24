import React, { useState } from "react";
import "../resources/styles.css";

export default function ProjectCard({ title, bgColor }) {
	return (
		<div
			className="project-card text"
			style={{
				flex: "1 1 500px",
				height: "80%",
				backgroundColor: bgColor,
				cursor: "pointer",
			}}
			// onMouseEnter={() => {
			// 	switch (title) {
			// 		case "css art":
			// 	}
			// }}
			onClick={() => {
				switch (title) {
					case "ascoltale":
						window.location.href = "https://ascoltale.vercel.app";
				}
			}}
		>
			<p style={{ maxWidth: "10ch" }}>{title}</p>
		</div>
	);
}
