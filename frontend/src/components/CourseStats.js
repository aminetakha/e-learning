import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "./UI/Spinner";
import MyRating from "./MyRating";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const CourseStats = () => {
	const { courseId } = useParams();
	const [reviews, setReviews] = useState([]);
	const [avg, setAvg] = useState(0);
	const [courseInfo, setCourseInfo] = useState();
	const [loading, setLoading] = useState(true);

	const useStyles = makeStyles({
		table: {
			width: "100%",
		},
		box: {
			border: "1px solid #ccc",
			borderRadius: "8px",
			height: "100px",
			width: "250px",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			justifyContent: "center",
		},
	});

	const classes = useStyles();

	useEffect(() => {
		axios
			.get(`/courses/${courseId}/stats`, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				setAvg(res.data.course.avg);
				setReviews(res.data.course.reviews);
				setCourseInfo(res.data.course.course);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<Container style={{ marginTop: "50px" }}>
					<div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "50px",
								flexWrap: "wrap",
								marginBottom: "40px",
							}}
						>
							<div className={classes.box}>
								<h2>Total Earning</h2>
								<p>{`$${courseInfo[0].total}`}</p>
							</div>
							<div className={classes.box}>
								<h2>Total Students</h2>
								<p>{`${courseInfo[0].count}`}</p>
							</div>
							<div className={classes.box}>
								<h2>Price</h2>
								<p>{`$${courseInfo[0].price}`}</p>
							</div>
							<div className={classes.box}>
								<h2>Average Rating</h2>
								<MyRating rating={avg} />
							</div>
						</div>
						<div>
							{reviews.length === 0 ? (
								<div
									style={{
										margin: "70px 0",
										textAlign: "center",
									}}
								>
									<h1>No reviews</h1>
								</div>
							) : (
								<TableContainer
									component={Paper}
									style={{
										display: "flex",
										justifyContent: "center",
										margin: "70px 0",
									}}
								>
									<Table
										className={classes.table}
										aria-label="simple table"
									>
										<TableHead>
											<TableRow>
												<TableCell></TableCell>
												<TableCell align="left">
													Review
												</TableCell>
												<TableCell align="left">
													Rating
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{reviews.map((review, index) => (
												<TableRow key={index}>
													<TableCell>
														<img
															src={`/${review.photo}`}
															width="70px"
															height="70px"
															style={{
																borderRadius:
																	"50%",
															}}
														/>
													</TableCell>
													<TableCell align="left">
														{review.review}
													</TableCell>
													<TableCell align="left">
														<MyRating
															rating={
																review.rating
															}
														/>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default CourseStats;
