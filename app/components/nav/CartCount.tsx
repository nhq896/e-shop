"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQuantity } = useCart();
  //   const cartItems: any =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("eShopCartItems")
  //       : null;
  //   const cProducts: CartProductType[] | null = JSON.parse(cartItems);

  //   const totalQuantityInCart: number =
  //     cProducts?.reduce((quantity, item) => {
  //       quantity += item.quantity;
  //       return quantity;
  //     }, 0) || 0;

  return (
    <Link href={"/cart"} className="relative cursor-pointer">
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center heigh text-sm leading-6">
        {cartTotalQuantity}
      </span>
    </Link>
  );
};

export default CartCount;
