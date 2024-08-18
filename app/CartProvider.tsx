"use client";

import { useEffect } from "react";
import { setCartList } from "@/redux/slice/CartSlice";
import { useDispatch } from "react-redux";

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCartData = localStorage.getItem("cartVal");
    if (savedCartData) {
      dispatch(setCartList(JSON.parse(savedCartData)));
    }
  }, []);
  return children;
}
