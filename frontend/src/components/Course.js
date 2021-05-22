import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		width: 300,
		margin: "20px",
	},
});

const Course = ({ course }) => {
	const classes = useStyles();

	const { title, username, thumbnail, price, average_rating } = course;

	return (
		<Link to={`/courses/${title}`}>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt="course thumbnail"
						height="180"
						image={`http://localhost:5000/${thumbnail}`}
						title="Course information"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{title}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{username}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{average_rating}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{`$${price}`}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

export default Course;
