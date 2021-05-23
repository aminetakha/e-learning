import React, { useState } from "react";
import github from "../assets/github.svg";
import gmail from "../assets/gmail.svg";
import linkedin from "../assets/linkedin.svg";
import web from "../assets/web.svg";
import whatsapp from "../assets/whatsapp.svg";

const Footer = () => {
	const [width] = useState(30);
	const [height] = useState(30);

	const styles = {
		social: {
			display: "flex",
			gap: "13px",
			alignItems: "center",
			margin: "20px 0",
		},
	};

	return (
		<div style={{ borderTop: "1px solid #ccc", padding: "30px 60px" }}>
			<div>
				<div style={styles.social}>
					<div>
						<img src={web} width={width} height={height} />
					</div>
					<div>
						<h3>https://aminetakha.vercel.app/</h3>
					</div>
				</div>
				<div style={styles.social}>
					<div>
						<img src={github} width={width} height={height} />
					</div>
					<div>
						<h3>https://github.com/aminetakha</h3>
					</div>
				</div>
				<div style={styles.social}>
					<div>
						<img src={linkedin} width={width} height={height} />
					</div>
					<div>
						<h3>https://www.linkedin.com/in/aminetakha/</h3>
					</div>
				</div>
				<div style={styles.social}>
					<div>
						<img src={gmail} width={width} height={height} />
					</div>
					<div>
						<h3>takhaamine@gmail.com</h3>
					</div>
				</div>
				<div style={styles.social}>
					<div>
						<img src={whatsapp} width={width} height={height} />
					</div>
					<div>
						<h3>0670-79-03-89</h3>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "30px",
				}}
			>
				<h2 style={{ color: "crimson" }}>OnlineClassroom</h2>
				<h3>2020-2021</h3>
			</div>
		</div>
	);
};

export default Footer;
