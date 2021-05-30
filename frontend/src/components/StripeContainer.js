import React from "react";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";

const PUBLIC_KEY =
	"pk_test_51HgXS9AM0fYeg1Kdd2cM4tI74MmHu7ZBHxiQVqOgziZfDYnQGkFbzL9oH4Z5IUYv8dh60BujZWa54tGAh902lzRR00MmVwHQVn";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
	const auth = useSelector((state) => state.auth);
	if (!(auth.isAUthenticated && auth.type.user === "student")) {
		props.history.push("/login");
	}
	return (
		<Container style={{ margin: "70px 0" }}>
			<Elements stripe={stripeTestPromise}>
				<PaymentForm />
			</Elements>
		</Container>
	);
};

export default StripeContainer;
