import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				marginTop: "50px",
			}}
		>
			<div className={styles.ldsRipple}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Spinner;
