import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
					style={{
						marginLeft: "40px",
						color: "crimson",
						cursor: "pointer",
						fontWeight: "bold",
					}}
					onClick={() => removeItemHandler(item.id)}
				>
					Remove
				</p>
				<p
					style={{
						marginLeft: "40px",
						color: "crimson",
						cursor: "pointer",
						fontWeight: "bold",
					}}
				>
					<Link
						to={`/courses/${item.id}/enroll`}
						style={{ textDecoration: "none" }}
					>
						Buy this course
					</Link>
				</p>
			</div>
			<div>
				<p>{`$${item.price}`}</p>
			</div>
		</div>
	);
};

export default CartItem;
