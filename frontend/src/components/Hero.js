import React from "react";
import hero from "../assets/hero.jpg";

const Hero = () => {
	return (
		<div
			style={{ width: "100%", display: "flex", justifyContent: "center" }}
		>
			<img src={hero} width="100%" />
		</div>
	);
};

export default Hero;
