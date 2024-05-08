import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
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
        <div className="flex flex-col gap-1 truncate">
          <Link href={`/product/${item.id}`} className="w-full truncate">
            {item.name}
          </Link>
          <div className="">{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
