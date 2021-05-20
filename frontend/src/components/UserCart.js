import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { removeCourse } from "../actions/auth";
const UserCart = () => {
	const [courses, setCourses] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		axios
			.get("http://localhost:5000/students/cart", {
				withCredentials: true,
			})
			.then((res) => setCourses(res.data.cart.cart.courses))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		let total;
		if (courses.length === 1) {
			total = courses[0].price;
		} else if (courses.length > 1) {
			total = courses.reduce((acc, curr) => acc.price + curr.price);
		} else {
			total = 0;
		}
		setTotalPrice(total);
	}, [courses]);

	const dispatch = useDispatch();
	const removeItemHandler = (id) => {
		console.log("remove cart item of authenticated user", id);
		axios
			.delete("http://localhost:5000/students/cart/course/" + id, {
				withCredentials: true,
			})
			.then((res) => {
				if ("success" in res.data) {
					dispatch(removeCourse());
					const newCourses = courses.filter(
						(course) => course.id != id
					);
					setCourses(newCourses);
				} else if ("error" in res.data) {
					alert(res.data.error);
				}
			});
	};

	if (courses.length === 0) {
		return <h1>Cart is empty</h1>;
	}

	const handleClick = async (event) => {};

	return (
		<div style={{ display: "flex", marginTop: "50px" }}>
			<div style={{ flex: 2 }}>
				{courses.map((item) => (
					<CartItem
						item={item}
						remove={removeItemHandler}
						key={item.id}
					/>
				))}
			</div>
			<div
				style={{
					flex: 1,
					marginTop: "20px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					paddingLeft: "50px",
					alignItems: "flex-start",
				}}
			>
				<p>Total:</p>
				<h1>
					<b>{`$${totalPrice}`}</b>
				</h1>

				<Button
					style={{ color: "white", backgroundColor: "crimson" }}
					onClick={handleClick}
				>
					Checkout
				</Button>
			</div>
		</div>
	);
};

export default UserCart;
