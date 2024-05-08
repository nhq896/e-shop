import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";
import { redirect } from "next/navigation";
// import { CartProductType } from "../product/[productId]/ProductDetails";

const Checkout = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  // const cartItems: any =
  //   typeof window !== "undefined"
  //     ? localStorage.getItem("eShopCartItems")
  //     : null;
  // const cartProducts: CartProductType[] | null = JSON.parse(cartItems);
  // if (
  //   cartProducts === null ||
  //   cartProducts === undefined ||
  //   cartProducts?.length === 0
  // ) {
  //   console.log(cartProducts);
  //   redirect("/cart");
  // }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
