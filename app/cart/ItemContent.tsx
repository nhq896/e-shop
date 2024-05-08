"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Suspense } from "react";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
  } = useCart();
  return (
    <Suspense>
      <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
        <div className="col-span-2 justify-start flex gap-2 md:gap-4">
          <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
              <Image
                loading="lazy"
                src={item.selectedImg.image}
                alt={item.name}
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between truncate">
            <Link href={`/product/${item.id}`} className="w-full truncate">
              {item.name}
            </Link>
            <div className="">{item.selectedImg.color}</div>
            <div className="w-[70px] ">
              <button
                className="text-slate-500 underline"
                onClick={() => {
                  handleRemoveProductFromCart(item);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQuantityIncrease={() => {
              handleCartQuantityIncrease(item);
            }}
            handleQuantityDecrease={() => {
              handleCartQuantityDecrease(item);
            }}
          />
        </div>
        <div className="justify-self-end font-semibold">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
    </Suspense>
  );
};

export default ItemContent;
