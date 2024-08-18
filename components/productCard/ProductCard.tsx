"use client";

import { ProductCardType } from "@/utils/types/types";
import { primaryBtn } from "../../utils/tailwingClass/predefinedClassName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addToCartList, updateToCartList } from "@/redux/slice/CartSlice";
import { successAlert } from "../appAlerts/appAlert";
import { useEffect } from "react";

export default function ProductCard(props: ProductCardType) {
  const dispatch = useDispatch();

  const productDataList = useSelector(
    (state: RootState) => state.productDataReducer.value
  );
  const cartDataList = useSelector(
    (state: RootState) => state.cartDataReducer.value
  );

  useEffect(() => {
    if (cartDataList[0]?.id !== 0) {
      localStorage.setItem("cartVal", JSON.stringify(cartDataList));
    }
  }, [cartDataList]);

  const { imgSrc, name, price, rating, id } = props;

  const handleAddToCart = (id: string) => {
    const selectedProduct = productDataList.find(
      (item) => item.id === parseInt(id)
    );
    if (selectedProduct) {
      if (
        cartDataList[0]?.id &&
        cartDataList.find((item) => item.id === parseInt(id))
      ) {
        dispatch(updateToCartList({ id: selectedProduct.id, qty: 1 }));
      } else {
        dispatch(addToCartList({ id: selectedProduct.id, qty: 1 }));
      }
      successAlert(1000, `${selectedProduct.title} added to cart`);
    } else {
      console.error("error adding product to cart");
    }
  };

  console.log(cartDataList)

  return (
    <div className="rounded-md border border-black p-2 h-[300px] w-[250px] flex flex-col justify-between">
      <img className="h-[60%]" alt="Product Image" src={imgSrc} />
      <div>{name}</div>
      <p className="text-sm">Rating:{rating}</p>
      <div className="flex justify-between">
        <p className="text-lg">Rs: {price}</p>
        <button className={primaryBtn} onClick={() => handleAddToCart(id)}>
          Add
        </button>
      </div>
    </div>
  );
}
