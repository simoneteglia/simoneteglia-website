import React, { useState } from "react";
import "../resources/styles.css";

export default function ProjectRow({ title, bgColor }) {
	return (
		<div
			style={{
				fontSize: "1.8em",
				borderBottom: "2px solid yellow",
			}}
		>
			<p
				className="text"
				style={{ cursor: "pointer" }}
				onClick={() => {
					switch (title) {
						case "ascoltale":
							window.location.href =
								"https://ascoltale.vercel.app";
					}
				}}
			>
				{title}
			</p>
		</div>
	);
}
