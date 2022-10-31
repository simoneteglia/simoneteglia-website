import React, { useState } from "react";
import ProjectRow from "./ProjectRow";
import ProjectCover from "./ProjectCover";
import global from "../resources/global.json";
const akiraFont = "Akira";

export default function LandingHtml({
	cursorCircleRef,
	cursorDotRef,
	projectToShow,
	setProjectToShow,
	scrollRef,
}) {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	return (
		<>
			<section
				style={{
					width: "100%",
					height: "100vh",
					zIndex: 10,
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
			</section>
			<section
				style={{
					width: "100%",
					height: "100vh",
					zIndex: "10",
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
			</section>
			<section
				style={{
					width: "100%",
					height: "100vh",
					zIndex: "10",
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
					<div
						id="project-section"
						style={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "row",
							width: "100%",
							height: "70%",
						}}
					>
						<div
							style={{
								display: "flex",
								flex: "1 0 500px",
								height: "80%",
								flexDirection: "column",
								justifyContent: "center",
							}}
							onMouseLeave={() => setProjectToShow("")}
						>
							<ProjectRow
								title="ascoltale"
								bgColor="#000"
								setProjectToShow={setProjectToShow}
								cursorCircleRef={cursorCircleRef}
								cursorDotRef={cursorDotRef}
								path="/ascoltale"
							/>
							{/* <ProjectRow
          title="robot escape"
          bgColor="blue"
          setProjectToShow={setProjectToShow}
          cursorCircleRef={props.cursorCircleRef}
          cursorDotRef={props.cursorDotRef}
        /> */}
							<ProjectRow
								title="side channel attack"
								bgColor="pink"
								setProjectToShow={setProjectToShow}
								cursorCircleRef={cursorCircleRef}
								cursorDotRef={cursorDotRef}
								path="/side-channel-attack"
							/>
							<ProjectRow
								title="css art"
								bgColor="darkmagenta"
								setProjectToShow={setProjectToShow}
								cursorCircleRef={cursorCircleRef}
								cursorDotRef={cursorDotRef}
								path="/css-art"
							/>
							<ProjectRow
								title="pixelator"
								bgColor="darkmagenta"
								setProjectToShow={setProjectToShow}
								cursorCircleRef={cursorCircleRef}
								cursorDotRef={cursorDotRef}
								scrollRef={scrollRef}
								path="/pixelator"
							/>
						</div>
						<div
							id="project-to-show"
							style={{
								flex: "1 1 60%",
								height: "90%",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "relative",
							}}
						>
							<ProjectCover projectToShow={projectToShow} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
