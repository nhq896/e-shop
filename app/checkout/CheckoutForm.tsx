"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { StripeAddressElementOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
          setTimeout(() => {
            router.push("/orders");
            router.refresh();
          }, 5000);
        }

        setIsLoading(false);
      });
  };

  const addressOptions: StripeAddressElementOptions = {
    mode: "shipping",
    fields: { phone: "always" },
    validation: {
      phone: { required: "always" },
    } /*, allowedCountries: ["VN", "US"]*/,
  };

  return (
    <Suspense>
      <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
          <Heading title="Enter your details to complete checkout" />
        </div>
        <h2 className="font-semibold mb-2">Address Information</h2>
        <AddressElement options={addressOptions} />
        <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
          Total: {formattedPrice}
        </div>
        <Button
          label={isLoading ? "Processing" : "Pay now"}
          disabled={isLoading || !stripe || !elements}
          isLoading={isLoading}
          onClick={() => {}}
        />
      </form>
    </Suspense>
  );
};

export default CheckoutForm;
