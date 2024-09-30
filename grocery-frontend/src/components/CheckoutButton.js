import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutButton = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment('your-client-secret', {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Payment error:', error);
    } else if (paymentIntent) {
      console.log('Payment successful:', paymentIntent);
      // Handle successful payment, e.g., update order status to "Paid"
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
};

// Wrapper Component for Checkout
const StripeWrapper = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutButton amount={amount} />
  </Elements>
);

export default StripeWrapper;
