import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { removeFromCart } from "../actions/cart";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.items);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		let total;
		if (cartItems.length === 1) {
			total = cartItems[0].price;
		} else if (cartItems.length > 1) {
			total = cartItems.reduce((acc, curr) => acc.price + curr.price);
		} else {
			total = 0;
		}
		setTotalPrice(total);
	}, [cartItems]);

	const dispatch = useDispatch();
	const removeItemHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	if (cartItems.length === 0) {
		return <h1>Cart is empty</h1>;
	}

	return (
		<div style={{ display: "flex", marginTop: "50px" }}>
			<div style={{ flex: 2 }}>
				{cartItems.map((item) => (
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

				<Button style={{ color: "white", backgroundColor: "crimson" }}>
					Checkout
				</Button>
			</div>
		</div>
	);
};

export default Cart;
