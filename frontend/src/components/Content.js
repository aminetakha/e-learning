import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 650,
		height: "100%",
		backgroundColor: theme.palette.background.paper,
		overflowY: "scroll",
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color: "blue",
		fontSize: "18px",
	},
	content: {
		border: "1px solid #ccc",
	},
}));

const Content = ({ course, readFile }) => {
	const classes = useStyles();
	const [itemToOpen, setItemToOpen] = useState([]);

	useEffect(() => {
		setItemToOpen([...course.sections]);
	}, []);

	const handleClick = (id) => {
		const items = itemToOpen.map((item) => {
			if (item.id === id) {
				item.open = !item.open;
			}
			return item;
		});
		setItemToOpen(items);
	};

	return (
		<List
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					{`${course.sections.length} sections`}
				</ListSubheader>
			}
			className={`${classes.root} ${classes.content}`}
		>
			{course.sections.map((section, index) => (
				<React.Fragment key={section.id}>
					<ListItem button onClick={() => handleClick(section.id)}>
						<ListItemText primary={section.title} />
						{itemToOpen.length > 0 && itemToOpen[index].open ? (
							<ExpandLess />
						) : (
							<ExpandMore />
						)}
					</ListItem>
					<Collapse
						in={itemToOpen.length > 0 && itemToOpen[index].open}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{section.files.map((file, fileIndex) => (
								<React.Fragment key={file.id}>
									<ListItem button className={classes.nested}>
										<ListItemText
											primary={file.name}
											onClick={() =>
												readFile(
													file.name,
													fileIndex,
													index
												)
											}
										/>
									</ListItem>
								</React.Fragment>
							))}
						</List>
					</Collapse>
				</React.Fragment>
			))}
		</List>
	);
};

export default Content;
