import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	Noise,
	DepthOfField,
	EffectComposer,
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
import ProjectCard from "./ProjectCard";
import Tires from "./Tires";

const akiraFont = "Akira";

const HtmlContent = (props) => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", handleResize);
	});

	const handleResize = () => {
		setWindowSize(window.innerWidth);
	};

	return (
		<Html fullscreen>
			{/**
			 * FIRST
			 * PAGE
			 */}
			<div
				style={{
					width: "100%",
					height: "100vh",
					zIndex: 10,
					position: "absolute",
					top: -props.top * 2000,
				}}
			>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						paddingLeft: "3vw",
						color: "yellow",
						alignItems: "flex-start",
						fontFamily: akiraFont,
					}}
				>
					<h1
						className="text"
						style={{
							fontSize:
								windowSize > global.SYSTEM.TABLET_WIDTH
									? "120px"
									: "60px",
						}}
					>
						SIMONE
						<br /> TEGLIA
					</h1>
					<p
						className="text"
						style={{
							fontSize: windowSize > 870 ? "40px" : "30px",
							maxWidth: "25ch",
							marginTop: "-2vh",
						}}
					>
						Hi ! I'm a junior front-end developer and a computer
						engineer student based in rome
					</p>
					<p className="text">*and f1 addicted</p>
				</div>
			</div>
			{/**
			 * SECOND
			 * PAGE
			 */}
			<div
				style={{
					width: "100%",
					height: "100vh",
					zIndex: "10",
					position: "absolute",
					top: window.innerHeight - window.innerHeight * props.top,
				}}
			>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						paddingLeft: "3vw",
						paddingRight: "3vw",
						color: "yellow",
						alignItems: "flex-start",
						fontFamily: akiraFont,
					}}
				>
					<h1
						className="text"
						style={{
							fontSize:
								windowSize > global.SYSTEM.TABLET_WIDTH
									? "80px"
									: "40px",
						}}
					>
						I'm currently enrolled in a msc in engineering in
						computer science
					</h1>
					<p
						className="text"
						style={{
							fontSize: windowSize > 870 ? "40px" : "30px",
							maxWidth: "30ch",
							marginTop: "-2vh",
						}}
					>
						My main intrests are Machine learning and natural
						language processing
					</p>
				</div>
			</div>
			{/**
			 * THIRD
			 * PAGE
			 */}
			<div
				style={{
					width: "100%",
					zIndex: "10",
					position: "absolute",
					top:
						2 * window.innerHeight - window.innerHeight * props.top,
				}}
			>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						paddingLeft: "3vw",
						paddingRight: "3vw",
						color: "yellow",
						alignItems: "flex-start",
						fontFamily: akiraFont,
					}}
				>
					<h1
						className="text"
						style={{
							fontSize:
								windowSize > global.SYSTEM.TABLET_WIDTH
									? "80px"
									: "40px",
						}}
					>
						My recent works
					</h1>
					<div id="project-section">
						<ProjectCard title="ascoltale" bgColor="#000" />
						<ProjectCard title="robot escape" bgColor="blue" />
						<ProjectCard
							title="side channel attack"
							bgColor="pink"
						/>
						<ProjectCard title="css art" bgColor="darkmagenta" />
					</div>
				</div>
			</div>
		</Html>
	);
};

const Composition = () => {
	const floating = false;
	const scroll = useScroll();
	const [top, setTop] = useState(scroll.offset);

	useFrame((state, delta) => {
		const r1 = scroll.range(0, 1 / 3);
		const r2 = scroll.range(1 / 3, 1 / 3);
		const r3 = scroll.range(2 / 3, 1 / 3);
		const offset = -1 - r1 - 1 - r2 - 1 - r3;
		const radius = 2;
		// state.camera.position.set(
		// 	Math.sin((offset * Math.PI) / 2) * radius,
		// 	0,
		// 	Math.cos((offset * Math.PI) / 2) * radius
		// );
		state.camera.lookAt(0, 0, 0);
		state.camera.position.set(0, offset * radius, 0);
		setTop(scroll.offset);
	});

	return (
		<>
			<HtmlContent top={top} />
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
				<Noise opacity={0.25} />
			</EffectComposer>
		</>
	);
}

const Landing3D = () => {
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
				<ScrollControls pages={1} damping={5}>
					<Composition />
				</ScrollControls>
				<Effects />
				<Environment preset="sunset" />
			</Suspense>
		</Canvas>
	);
};
export default Landing3D;
