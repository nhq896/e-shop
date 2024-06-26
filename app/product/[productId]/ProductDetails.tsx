"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
  quantity: number;
};

const Horizontal = () => {
  return <hr className="w-[50%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isMaximumInCart, setIsMaximumInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  // console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedImg.color === cartProduct.selectedImg.color
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    setIsMaximumInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedImg.color === cartProduct.selectedImg.color
      );

      if (
        existingIndex > -1 &&
        cartProduct.selectedImg.quantity <= cartProducts[existingIndex].quantity
      ) {
        setIsMaximumInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => {
      return item.rating + acc;
    }, 0) / product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <h2 className="text-xl font-semibold text-slate-700">
          {formatPrice(product.price)}
        </h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span>
          <span> {product.category}</span>
        </div>
        <div>
          <span className="font-semibold">BRAND:</span>
          <span> {product.brand}</span>
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          inStock={product.inStock}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button
            label="Add To Cart"
            onClick={() => {
              handleAddProductToCart(cartProduct, isProductInCart);
              router.refresh();
            }}
            disabled={
              !product.inStock ||
              cartProduct.selectedImg.quantity === 0 ||
              isMaximumInCart
            }
          />
          {isMaximumInCart && (
            <span className="text-sm text-rose-500 whitespace-nowrap mt-1">
              You have reached the maximum add to cart
            </span>
          )}
        </div>
        {/* </>
        )} */}
      </div>
    </div>
  );
};

export default ProductDetails;
