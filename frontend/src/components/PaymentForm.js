import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import Spinner from "./UI/Spinner";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
};

function PaymentForm(props) {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);
	const stripe = useStripe();
	const elements = useElements();
	const { courseId } = useParams();

	useEffect(() => {
		axios
			.get(`/students/verify/${courseId}`)
			.then((res) => {
				if (res.data.count) {
					// return props.history.push(`/my-courses`);
				}
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [courseId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!error) {
			try {
				const { id } = paymentMethod;
				const response = await axios.post(
					`/courses/${courseId}/enroll`,
					{
						id,
					},
					{ withCredentials: true }
				);

				if (response.data.success) {
					setSuccess(true);
				}
			} catch (error) {
				console.log("Error", error);
			}
		} else {
			console.log("ERROR", error.message);
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					{!success ? (
						<form onSubmit={handleSubmit}>
							<fieldset className="FormGroup">
								<div className="FormRow">
									<CardElement options={CARD_OPTIONS} />
								</div>
							</fieldset>
							<button className="pay-btn">Pay</button>
						</form>
					) : (
						<div>
							<h2>
								Congratulations!! You just bought the course
							</h2>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default withRouter(PaymentForm);
