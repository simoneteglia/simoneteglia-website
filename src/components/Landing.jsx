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
		<Html fullscreen style={{ pointerEvents: "none" }}>
			<div
				style={{
					width: "100%",
					height: "100vh",
					zIndex: "10",
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
						style={{
							fontSize: windowSize > 870 ? "40px" : "30px",
							maxWidth: "25ch",
							marginTop: "-2vh",
						}}
					>
						Hi ! I'm a junior front-end developer and a computer
						engineer student based in rome
					</p>
					<p>*and f1 addicted</p>
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
					height: "100vh",
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
						style={{
							fontSize:
								windowSize > global.SYSTEM.TABLET_WIDTH
									? "80px"
									: "40px",
						}}
					>
						My recent works
					</h1>
					<div
						id="project-section"
						style={{
							width: "100%",
							height: "60vh",
							display: "flex",
							alignItems: "center",
							gap: "3vw",
							flexWrap: "wrap",
						}}
					>
						<div
							className="project-card"
							style={{
								flex: "1 1 300px",
								height: "80%",
								backgroundColor: "black",
							}}
						>
							ascoltale
						</div>
						<div
							className="project-card"
							style={{
								flex: "1 1 300px",
								height: "80%",
								backgroundColor: "blue",
							}}
						>
							robot escape
						</div>
						<div
							className="project-card"
							style={{
								flex: "1 1 300px",
								height: "80%",
								backgroundColor: "pink",
							}}
						>
							side channel attack
						</div>
					</div>
				</div>
			</div>
		</Html>
	);
};

const Composition = () => {
	const count = window.innerWidth > global.SYSTEM.TABLET_WIDTH ? 18 : 8;
	const scroll = useScroll();

	const [top, setTop] = useState(scroll.offset);

	useFrame((state, delta) => {
		const r1 = scroll.range(0, 1 / 3);
		const r2 = scroll.range(1 / 3, 1 / 3);
		const r3 = scroll.range(2 / 3, 1 / 3);
		const offset = -1 - r1 - 1 - r2 - 1 - r3;
		const radius = 2;
		state.camera.position.set(
			Math.sin((offset * Math.PI) / 2) * radius,
			0,
			Math.cos((offset * Math.PI) / 2) * radius
		);
		state.camera.lookAt(0, 0, 0);
		setTop(scroll.offset);
	});

	return (
		<>
			<HtmlContent top={top} />
			{Array.from({ length: count }, (_, x) => (
				<Tire key={x} z={x > count / 3 ? -x : x} />
			))}
		</>
	);
};

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
				<ScrollControls pages={1} damping={3}>
					<Composition />
				</ScrollControls>
				<EffectComposer>
					<DepthOfField
						focusDistance={0}
						focalLength={
							window.innerWidth > global.SYSTEM.TABLET_WIDTH
								? 0.01
								: 0.02
						}
						bokehScale={2}
						height={480}
					/>
					<Noise opacity={0.25} />
				</EffectComposer>
				<Environment preset="sunset" />
			</Suspense>
		</Canvas>
	);
};
export default Landing3D;

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

function Tire({ z, ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF(
		"/models/ferrari_f2012_wheel/scene.gltf"
	);
	const { viewport } = useThree();
	const [data] = useState({
		x: THREE.MathUtils.randFloatSpread(1),
		y: THREE.MathUtils.randFloatSpread(20),
		rX: THREE.MathUtils.randFloat(0, 0.01),
		rY: THREE.MathUtils.randFloat(0, 0.01),
		rZ: THREE.MathUtils.randFloat(0, 0.01),
	});

	const offsetX = window.innerWidth > global.SYSTEM.MOBILE_WIDTH ? 2 : 0;
	const mult = window.innerWidth > global.SYSTEM.MOBILE_WIDTH ? 0.5 : 1;
	useFrame((state) => {
		group.current.position.set(
			data.x * 5 * viewport.width + offsetX,
			(data.y += 0.01),
			z * mult - 1
		);
		group.current.rotation.x += data.rX;
		group.current.rotation.y += data.rY;
		group.current.rotation.z += data.rZ;
		if (data.y > 5.5 * viewport.height) {
			data.y = -5 * viewport.height;
		}
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group
					position={[0.08, -0.07, 0.64]}
					rotation={[-1.57, 1.14, -0.01]}
					scale={[0.64, 0.64, 0.64]}
				>
					<mesh
						geometry={nodes.Front_Right_Rim001_0.geometry}
						material={materials.material}
					/>
				</group>
				<group
					position={[0.25, 0, 0.64]}
					rotation={[2.26, 0.39, -1.84]}
					scale={[0.76, 0.76, 0.76]}
				>
					<mesh
						geometry={nodes.Front_Right_Rim003_0.geometry}
						material={materials.Rayons}
					/>
					<mesh
						geometry={nodes.Front_Right_Rim003_1.geometry}
						material={materials.Rayons_OZ}
					/>
				</group>
				<group
					position={[0.05, -0.09, 0.64]}
					rotation={[-1.57, 1.14, -0.01]}
					scale={[0.63, 0.63, 0.63]}
				>
					<mesh
						geometry={nodes.Front_Left_Slick_Tyre002_0.geometry}
						material={materials["Tyre-sides"]}
					/>
					<mesh
						geometry={nodes.Front_Left_Slick_Tyre002_1.geometry}
						material={materials.Bande_roullement}
					/>
				</group>
				<group
					position={[0.26, 0.01, 0.64]}
					rotation={[1.57, -1.14, -3.13]}
					scale={[0.99, 0.99, 0.99]}
				>
					<mesh
						geometry={nodes.ecrou_roue_0.geometry}
						material={materials.Ecrou}
					/>
				</group>
				<group
					position={[0.35, 0.05, 0.64]}
					rotation={[-1.57, 1.14, -0.01]}
					scale={[0.08, 0.08, 0.08]}
				>
					<mesh
						geometry={nodes.Front_Left_Ecrou001_0.geometry}
						material={materials.Boulon}
					/>
				</group>
				<group
					position={[0.35, 0.05, 0.64]}
					rotation={[-0.47, -0.26, -1.11]}
					scale={[0.62, 0.62, 0.62]}
				>
					<mesh
						geometry={nodes.Cube_0.geometry}
						material={materials["harnais-metal.001"]}
					/>
				</group>
			</group>
		</group>
	);
}
