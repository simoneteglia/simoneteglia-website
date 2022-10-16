import React, { useState, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import global from "../resources/global.json";
import { faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function Tires({ floating }) {
	return <>{floating ? <FloatingTires /> : <SingleTire />}</>;
}

function FloatingTires() {
	const count = window.innerWidth > global.SYSTEM.TABLET_WIDTH ? 15 : 8;
	return (
		<>
			{Array.from({ length: count }, (_, x) => (
				<FloatingTire key={x} z={x > count / 3 ? -x : x} />
			))}
		</>
	);
}

function FloatingTire({ z, ...props }) {
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

function SingleTire(props) {
	const group = useRef();
	const [distanceX, setDistanceX] = useState(50);
	const [distanceY, setDistanceY] = useState(50);

	useEffect(() => {
		document.addEventListener(
			"mousemove",
			(e) => {
				const { x, y } = e;
				let distanceX =
					((x - window.innerWidth / 2) / (window.innerWidth / 2)) *
					100;
				setDistanceX(distanceX);

				let distanceY =
					((y - window.innerHeight / 2) / (window.innerHeight / 2)) *
					100;
				setDistanceY(distanceY);
			},
			[]
		);
	});

	const { nodes, materials } = useGLTF(
		"/models/ferrari_f2012_wheel/scene.gltf"
	);

	return (
		<group ref={group} {...props} dispose={null} position={[0, -0.5, -0.8]}>
			<group rotation={[-Math.PI / 2, 0, -0.3]}>
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
