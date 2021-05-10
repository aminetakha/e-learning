import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CartItem = ({ item, remove }) => {
	const removeItemHandler = (id) => {
		remove(id);
	};
	return (
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
				<img src={`http://localhost:5000/${item.thumbnail}`} />
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
	);
};

export default CartItem;
