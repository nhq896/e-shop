"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  // const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => {
      return item.rating + acc;
    }, 0) / data.reviews.length;

  return (
    <Link
      href={`/product/${data.id}`}
      // onClick={() => {
      //   router.push(`/product/${data.id}`);
      // }}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            sizes="100%"
            loading="lazy"
            src={data.images[0].image}
            alt={`Product Image`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="truncate mt-4 w-full">{data.name}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
