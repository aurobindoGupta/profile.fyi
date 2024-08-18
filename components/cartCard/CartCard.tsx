"use client";

import { CartCardType } from "@/utils/types/types";
import { primaryBtn } from "../../utils/tailwingClass/predefinedClassName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  addToCartList,
  deleteProductCartList,
  removeQtyCartList,
  updateToCartList,
} from "@/redux/slice/CartSlice";
import { successAlert } from "../appAlerts/appAlert";
import { useEffect } from "react";

export default function CartCard(props: CartCardType) {
  const dispatch = useDispatch();

  const productDataList = useSelector(
    (state: RootState) => state.productDataReducer.value
  );
  const cartDataList = useSelector(
    (state: RootState) => state.cartDataReducer.value
  );

  const { imgSrc, name, price, rating, id, qty } = props;

  useEffect(() => {
    if (cartDataList[0]?.id !== 0) {
      localStorage.setItem("cartVal", JSON.stringify(cartDataList));
    }
  }, [cartDataList]);

  const handleAddQty = (id: string) => {
    const selectedProduct = productDataList.find(
      (item) => item.id === parseInt(id)
    );
    if (selectedProduct) {
      if (cartDataList.find((item) => item.id === parseInt(id))) {
        dispatch(updateToCartList({ id: selectedProduct.id, qty: 1 }));
      }
      successAlert(1000, `${selectedProduct.title} QTY + 1`);
    } else {
      console.error("error adding product to cart");
    }
  };
  const handleSubQty = (id: string) => {
    const selectedProduct = productDataList.find(
      (item) => item.id === parseInt(id)
    );
    if (selectedProduct) {
      const cartProduct = cartDataList.find((item) => item.id === parseInt(id));
      if (cartProduct) {
        if (cartProduct.qty > 1) {
          dispatch(removeQtyCartList({ id: selectedProduct.id, qty: 1 }));
        } else {
          dispatch(deleteProductCartList({ id: selectedProduct.id, qty: 1 }));
        }
      }
      successAlert(1000, `${selectedProduct.title} QTY - 1`);
    } else {
      console.error("error removing product to cart");
    }
  };

  return (
    <div className="rounded-md border border-black p-2 h-[100px] sm:w-[40%] flex justify-between">
      <div className="w-fit flex gap-1">
        <img className="w-[30%]" alt="Product Image" src={imgSrc} />
        <div className="flex flex-col">
          <div>{name}</div>
          <div className="flex gap-2">
            <button
              className={`${primaryBtn} h-fit px-2`}
              onClick={() => handleSubQty(id)}
            >
              -
            </button>
            <p>{qty}</p>
            <button
              className={`${primaryBtn} h-fit px-2`}
              onClick={() => handleAddQty(id)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="w-[25%]">
        <p className="text-lg">Rs: {price}</p>
      </div>
    </div>
  );
}
