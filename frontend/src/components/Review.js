import React from "react";

const Review = ({ reviews }) => {
	return (
		<div>
			{reviews.map((review) => (
				<div key={review.id}>
					<div>
						<img
							src={`http://localhost:5000/${review.student.photo}`}
						/>
					</div>
					<div>
						<h3>{review.student.username}</h3>
						<p>{review.rating}</p>
						<p>{review.review}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Review;
