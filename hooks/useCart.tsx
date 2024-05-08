import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (
    product: CartProductType,
    isProductInCart: boolean
  ) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  const getCartItemsFromLocal = () => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    return cProducts;
  };

  const setCartProductsToLocal = (cProducts: CartProductType[] | null) => {
    localStorage.setItem("eShopCartItems", JSON.stringify(cProducts));
  };

  useEffect(() => {
    // stackoverflow: Handle localStorage changes in React to re-render components
    const onStorage = () => {
      setCartProducts(getCartItemsFromLocal());
    };

    window.addEventListener("storage", onStorage);
    // console.log("rerender local");

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    // const cartItems: any = localStorage.getItem("eShopCartItems");
    // const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const cProducts = getCartItemsFromLocal();
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQuantity(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback(
    (product: CartProductType, isProductInCart?: boolean) => {
      setCartProducts((prev) => {
        const prevCartProducts: CartProductType[] | null =
          getCartItemsFromLocal();

        let updatedCart;

        if (isProductInCart && prevCartProducts) {
          const existingIndex = prevCartProducts.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedImg.color === product.selectedImg.color
          );

          let oldQuantity = 0;
          if (existingIndex > -1) {
            oldQuantity = prevCartProducts[existingIndex].quantity;
          }

          let filteredProducts = prevCartProducts.filter(
            (item) =>
              item.id !== product.id ||
              item.selectedImg.color !== product.selectedImg.color
          );

          updatedCart = [
            { ...product, quantity: product.quantity + oldQuantity },
            ...filteredProducts,
          ];
          toast.success("Product added to cart");
          setCartProductsToLocal(updatedCart);

          return updatedCart;
        }

        if (prev) {
          updatedCart = [product, ...prev];
        } else {
          updatedCart = [product];
        }
        toast.success("Product added to cart");
        setCartProductsToLocal(updatedCart);

        return updatedCart;
      });
    },
    []
  );

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return (
            item.id !== product.id ||
            item.selectedImg.color !== product.selectedImg.color
          );
        });
        setCartProducts(filteredProducts);
        toast.success("Product removed");
        setCartProductsToLocal(filteredProducts);
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      // toast if reach max product quantity in stock
      if (product.quantity >= product.selectedImg.quantity) {
        return toast.error("Ooop! Maximum reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          ++updatedCart[existingIndex].quantity;
        }

        setCartProducts(updatedCart);
        setCartProductsToLocal(updatedCart);
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Ooop! Minimum reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          --updatedCart[existingIndex].quantity;
        }

        setCartProducts(updatedCart);
        setCartProductsToLocal(updatedCart);
      }
    },
    [cartProducts]
  );

  const updateInventoryQuantity = useCallback(
    async (id: string, color: string, quantity: number) => {
      await axios
        .put("/api/product", { id, color, quantity })
        .then((res) => {
          console.log("updated Inventory Quantity");
        })
        .catch((err: any) => {
          // toast.error("Oops! Something went wrong");
          console.log("Error updated Inventory Quantity", err);
        });
    },
    []
  );

  const updateInStock = useCallback(async (id: string) => {
    await axios
      .put("/api/product", { id })
      .then((res) => {
        console.log("updated stock Quantity");
      })
      .catch((err: any) => {
        // toast.error("Oops! Something went wrong");
        console.log("Error updated stock Quantity", err);
      });
  }, []);

  const handleClearCart = useCallback(() => {
    if (cartProducts!.length > 0) {
      cartProducts?.forEach(async (item) => {
        // console.log(item.id, item.selectedImg.color, item.quantity);
        await updateInventoryQuantity(
          item.id,
          item.selectedImg.color,
          item.selectedImg.quantity - item.quantity
        );
        await updateInStock(item.id);
      });
    }

    setCartProducts([]); // có thể đặt là null, nhưng null thì ui sẽ không re-render
    setCartTotalQuantity(0);
    setCartTotalAmount(0);
    setCartProductsToLocal([]); // có thể đặt là null, nhưng null thì ui sẽ không re-render
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
