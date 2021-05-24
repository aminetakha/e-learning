import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const MyRating = ({ rating, reviewsCount }) => {
	return (
		<div>
			<Box
				component="fieldset"
				borderColor="transparent"
				style={{ display: "flex", alignItems: "center" }}
			>
				<Rating
					name="read-only"
					value={rating}
					readOnly
					precision={0.5}
				/>
				{reviewsCount && <p>{`(${reviewsCount} reviews)`}</p>}
			</Box>
		</div>
	);
};

export default MyRating;
