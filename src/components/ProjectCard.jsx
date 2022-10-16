import React, { useState } from "react";

export default function ProjectCard({ title, bgColor }) {
	return (
		<div
			className="project-card"
			style={{
				flex: "1 1 500px",
				height: "80%",
				backgroundColor: bgColor,
			}}
			onMouseEnter={() => {
				switch (title) {
					case "css art":
				}
			}}
		>
			{title}
		</div>
	);
}
