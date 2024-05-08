"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { usePathname } from "next/navigation";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const btnStyles =
  "disabled:opacity-50 disabled:cursor-not-allowed border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex relative gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
        <div className="flex gap-4 items-center text-base">
          <button
            onClick={handleQuantityDecrease}
            className={`${btnStyles}`}
            disabled={cartProduct.quantity === 1}
          >
            -
          </button>
          <div>{cartProduct.quantity}</div>
          <button
            onClick={handleQuantityIncrease}
            className={btnStyles}
            disabled={cartProduct.quantity >= cartProduct.selectedImg.quantity}
          >
            +
          </button>
        </div>
        {true && (
          <span
            className={`text-sm ${
              pathname === "/cart"
                ? "absolute top-full mt-1 text-slate-600 whitespace-nowrap left-1/2 -translate-x-1/2"
                : ""
            }`}
          >
            {cartProduct.selectedImg.quantity ?? 0} available
          </span>
        )}
      </div>
    </>
  );
};

export default SetQuantity;
