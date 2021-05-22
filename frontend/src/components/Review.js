import React from "react";
import MyRating from "./MyRating";

const Review = ({ reviews }) => {
	return (
		<div style={{ marginTop: "50px" }}>
			{reviews.map((review) => (
				<div
					key={review.id}
					style={{
						borderBottom: "1px solid #ccc",
						marginBottom: "30px",
						display: "flex",
						gap: "30px",
						alignItems: "center",
						padding: "30px 0",
					}}
				>
					<div>
						<img
							src={`http://localhost:5000/${review.student.photo}`}
							width="80px"
							height="80px"
							style={{ borderRadius: "50%" }}
						/>
					</div>
					<div>
						<h2>{review.student.username}</h2>
						<div>
							<MyRating rating={review.rating} />
						</div>
						<p>{review.review}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Review;
