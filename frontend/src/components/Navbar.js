import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import navStyle from "../styles/navStyle";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => navStyle(theme));

const Navbar = ({ history }) => {
	const classes = useStyles();
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{auth.isAuthenticated ? (
				<>
					<MenuItem>
						<img
							src={`http://localhost:5000/${auth.user.photo}`}
							width="30px"
							height="30px"
						/>
					</MenuItem>
					<MenuItem>
						<Button color="secondary">Log out</Button>
					</MenuItem>
				</>
			) : (
				<>
					<MenuItem>
						<Button color="primary">Log in</Button>
					</MenuItem>
					<MenuItem>
						<Button color="secondary">Sign up</Button>
					</MenuItem>
				</>
			)}
			<MenuItem>
				<Button>Cart</Button>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar className={classes.backColor}>
					<Typography className={classes.title} variant="h6" noWrap>
						OnlineClassroom
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search for a course..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button
							className={classes.cartBtnContainer}
							onClick={() => history.push("/cart")}
						>
							<div className={classes.rating}>
								{auth.isAuthenticated
									? auth.cart
									: cart.items.length}
							</div>
							<div className={classes.cartIcon}>
								<ShoppingCartOutlinedIcon />
							</div>
						</Button>
						{auth.isAuthenticated ? (
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Link
									to="/courses"
									style={{ margin: "0px 10px" }}
								>
									View Courses
								</Link>
								<img
									src={`http://localhost:5000/${auth.user.photo}`}
									width="35px"
									height="35px"
									style={{
										margin: "0px 10px",
										borderRadius: "50%",
									}}
								/>

								<Button color="secondary">Log out</Button>
							</div>
						) : (
							<>
								<Button
									color="secondary"
									onClick={() => history.push("/login")}
								>
									Log in
								</Button>
								<Button color="secondary">Sign up</Button>
							</>
						)}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon className={classes.more} />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</div>
	);
};

export default withRouter(Navbar);
