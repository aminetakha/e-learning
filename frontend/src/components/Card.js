import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 300,
	},
	gridRoot: {
		flexGrow: 1,
	},
	title: {
		color: "black",
	},
	link: {
		textDecoration: "none",
	},
});

const MyCard = ({ category }) => {
	const classes = useStyles();
	return (
		<Grid item sm={4} md={3} xs={6}>
			<Card className={null}>
				<Link
					to={`/courses/category/${category.title}`}
					className={classes.link}
				>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image={`http://localhost:5000/${category.thumbnail}`}
							title="Category"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h6"
								component="h2"
								className={classes.title}
							>
								{category.title}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
			</Card>
		</Grid>
	);
};

export default MyCard;
