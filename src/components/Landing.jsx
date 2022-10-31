import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	Noise,
	DepthOfField,
	EffectComposer,
	Vignette,
} from "@react-three/postprocessing";
import {
	Environment,
	Html,
	OrbitControls,
	useGLTF,
	ScrollControls,
	useScroll,
} from "@react-three/drei";
import { Suspense } from "react";

import global from "../resources/global.json";
import "../resources/styles.css";
import Tires from "./Tires";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingHtml from "./LandingHtml";
import PixelatorPage from "./PixelatorPage";

const HtmlContent = ({ cursorCircleRef, cursorDotRef, scrollRef }) => {
	const [projectToShow, setProjectToShow] = useState(null);
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
	}, []);

	const handleResize = () => {
		setWindowSize(window.innerWidth);
	};

	return (
		<Html fullscreen style={{ height: "300vh" }}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<LandingHtml
								cursorCircleRef={cursorCircleRef}
								cursorDotRef={cursorDotRef}
								projectToShow={projectToShow}
								setProjectToShow={setProjectToShow}
								scrollRef={scrollRef}
							/>
						}
					/>
					<Route
						path="pixelator"
						element={<PixelatorPage scrollRef={scrollRef} />}
					/>
				</Routes>
			</BrowserRouter>
		</Html>
	);
};

const Composition = ({ cursorCircleRef, cursorDotRef }) => {
	const floating = false;
	const scroll = useScroll();

	useFrame((state, delta) => {
		const r1 = scroll.range(0, 1 / 3);
		const r2 = scroll.range(1 / 3, 1 / 3);
		const r3 = scroll.range(2 / 3, 1 / 3);
		let offset = -1 - r1 - 1 - r2 - 1 - r3;
		const radius = 2;
		// state.camera.position.set(
		// 	Math.sin((offset * Math.PI) / 2) * radius,
		// 	0,
		// 	Math.cos((offset * Math.PI) / 2) * radius
		// );
		state.camera.lookAt(0, 0, 0);
		state.camera.position.set(0, offset * radius, 0);

		// let page = window.location.href.split("/")[3];
	});

	return (
		<>
			<HtmlContent
				cursorDotRef={cursorDotRef}
				cursorCircleRef={cursorCircleRef}
				scrollRef={scroll}
			/>
			<Tires floating={floating} />
		</>
	);
};

const CanvasFallback = () => {
	return (
		<Html fullscreen>
			<div
				style={{
					height: "100vh",
					width: "100vw",
					backgroundColor: "#52b2db",
					tranition: "all 0.5s ease",
				}}
			></div>
		</Html>
	);
};

function Effects() {
	return (
		<>
			<EffectComposer>
				<DepthOfField
					focusDistance={0}
					focalLength={
						window.innerWidth > global.SYSTEM.TABLET_WIDTH
							? 0.01
							: 0.02
					}
					bokehScale={50}
					height={480}
				/>
				<Noise opacity={0.3} />
				<Vignette eskil={false} offset={0.1} darkness={0.5} />
			</EffectComposer>
		</>
	);
}

const Landing3D = ({ cursorDotRef, cursorCircleRef }) => {
	return (
		<Canvas
			dpr={[1, 1]}
			legacy
			camera={{
				position: [0, 0, 1],
				fov: 60,
			}}
		>
			<Suspense fallback={<CanvasFallback />}>
				<color args={["#136EB2"]} attach="background" />
				<ScrollControls pages={2} damping={5}>
					<Composition
						cursorDotRef={cursorDotRef}
						cursorCircleRef={cursorCircleRef}
					/>
				</ScrollControls>
				<Effects />
				<Environment preset="sunset" />
			</Suspense>
		</Canvas>
	);
};
export default Landing3D;
