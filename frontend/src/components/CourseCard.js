import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		height: 200,
		marginTop: 50,
		cursor: "pointer",
	},
	media: {
		height: "100%",
		width: "100%",
	},
	info: {
		flex: 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	price: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
	},
});

const CourseCard = ({
	title,
	description,
	content,
	price,
	thumbnail,
	createdAt,
	history,
}) => {
	const classes = useStyles();
	return (
		<Card
			className={classes.root}
			onClick={() => history.push(`/courses/${title}`)}
		>
			<CardActionArea className={classes.imageContainer}>
				<CardMedia
					className={classes.media}
					image={`http://localhost:5000/${thumbnail}`}
					title="Course"
				/>
			</CardActionArea>
			<CardContent className={classes.info}>
				<Typography gutterBottom variant="h5" component="h2">
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{description}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{`Created At: ${createdAt}`}
				</Typography>
			</CardContent>
			<CardContent className={classes.price}>{`$${price}`}</CardContent>
		</Card>
	);
};

export default withRouter(CourseCard);
