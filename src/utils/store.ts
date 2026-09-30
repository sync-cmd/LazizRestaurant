import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id &&
            product.optionTitle === item.optionTitle
        );

        if (productInState) {
          if (productInState.quantity >= 10) {
            toast.error("Item limit reached. You can only add up to 10 of this product.");
            return;
          }

          const addable = Math.min(10 - productInState.quantity, item.quantity);
          const unitPrice = item.price / item.quantity;
          if (addable < item.quantity) {
            toast.error("Item limit reached. Only up to 10 units can be added per item.");
          }
          const updatedProducts = products.map((product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
              ? {
                  ...productInState,
                  quantity: productInState.quantity + addable,
                  price: productInState.price + unitPrice * addable,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + addable,
            totalPrice: state.totalPrice + unitPrice * addable,
          }));
        } else {
          const quantity = Math.min(item.quantity, 10);
          if (quantity < item.quantity) {
            toast.error("Item limit reached. Only up to 10 units can be added per item.");
          }
          const price = item.price * (quantity / item.quantity);
          set((state) => ({
            products: [...state.products, { ...item, quantity, price }],
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + price,
          }));
        }
      },
      updateQuantity(item, delta) {
        set((state) => {
          const updatedProducts = state.products
            .map((product) => {
              if (
                product.id === item.id &&
                product.optionTitle === item.optionTitle
              ) {
                const newQuantity = Math.min(10, product.quantity + delta);
                if (newQuantity <= 0) return null;

                const unitPrice = product.price / product.quantity;
                return {
                  ...product,
                  quantity: newQuantity,
                  price: unitPrice * newQuantity,
                };
              }
              return product;
            })
            .filter((product): product is typeof product & { quantity: number; price: number } => product !== null);

          const totalItems = updatedProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          );
          const totalPrice = updatedProducts.reduce(
            (sum, product) => sum + product.price,
            0
          );

          return {
            products: updatedProducts,
            totalItems,
            totalPrice,
          };
        });
      },
      removeFromCart(item) {
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) =>
              product.id !== item.id ||
              product.optionTitle !== item.optionTitle
          );

          const totalItems = updatedProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          );
          const totalPrice = updatedProducts.reduce(
            (sum, product) => sum + product.price,
            0
          );

          return {
            products: updatedProducts,
            totalItems,
            totalPrice,
          };
        });
      },
    }),
    { name: "cart", skipHydration: true }
  )
);