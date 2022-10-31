import React, { useState, useEffect } from "react";

export default function PixelatorPage({}) {
	useEffect(() => {
		const container = document.getElementById("pixelator-page");
		if (container) container.scrollIntoView();
	}, []);

	return (
		<div id="pixelator-page" style={{ height: "100vh" }}>
			<h1>Pixelator</h1>
		</div>
	);
}
