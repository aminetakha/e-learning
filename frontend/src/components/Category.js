import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Spinner from "./UI/Spinner";

const useStyles = makeStyles({
	heading: {
		margin: "20px 0px",
	},
});

const Category = () => {
	const [categories, setCategories] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		axios
			.get("http://localhost:5000/categories")
			.then((res) => {
				setCategories(res.data.categories);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{categories.length === 0 ? (
				<Spinner />
			) : (
				<Container>
					<Typography
						component="h1"
						variant="h6"
						className={classes.heading}
					>
						Top categories
					</Typography>
					<Grid
						container
						direction="row"
						alignContent="center"
						alignItems="center"
						wrap="wrap"
						spacing={2}
					>
						{categories.map((category) => (
							<Card key={category.id} category={category} />
						))}
					</Grid>
				</Container>
			)}
		</div>
	);
};

export default Category;
