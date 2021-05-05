import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { removeFromCart } from "../actions/cart";

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
					<div
						key={item.id}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							margin: "20px",
						}}
					>
						<div>
							<img
								src={`http://localhost:5000/${item.thumbnail}`}
							/>
						</div>
						<div
							style={{
								display: "flex",
							}}
						>
							<p>
								<b>{item.title}</b>
							</p>
							<p
								style={{ marginLeft: "40px" }}
								onClick={() => removeItemHandler(item.id)}
							>
								Remove
							</p>
						</div>
						<div>
							<p>{`$${item.price}`}</p>
						</div>
					</div>
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
