import { fade } from "@material-ui/core/styles";

export default (theme) => {
	return {
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
			color: "crimson",
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2),
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				marginLeft: theme.spacing(3),
				width: "auto",
			},

			border: "1px solid black",
			color: "black",
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "black",
		},
		inputRoot: {
			color: "inherit",
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("md")]: {
				width: "20ch",
			},
		},
		sectionDesktop: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "flex",
			},
		},
		sectionMobile: {
			display: "flex",
			[theme.breakpoints.up("md")]: {
				display: "none",
			},
		},
		backColor: {
			backgroundColor: "white",
			margin: 0,
		},
		more: {
			color: "black",
		},
		cartBtnContainer: {
			position: "relative",
		},
		rating: {
			position: "absolute",
			top: -5,
			right: 5,
			width: 23,
			height: 23,
			backgroundColor: "crimson",
			color: "white",
			borderRadius: "50%",
		},
	};
};
