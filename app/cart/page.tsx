"use client";
import { errorAlert } from "@/components/appAlerts/appAlert";
import CartCard from "@/components/cartCard/CartCard";
import useGetAllProducts from "@/hooks/getAllProducts";
import { RootState } from "@/redux/store/store";
import {
  primaryBtn,
  secondaryBtn,
} from "@/utils/tailwingClass/predefinedClassName";
import { CartValueDataType } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const [cartValue, setCartValues] = useState<CartValueDataType[]>();
  const [totalCartCost, setTotalCartCost] = useState("0");
  const [paybleCost, setPaybleCost] = useState("0");
  const [discountFlag, setDiscountFLag] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const { getAllProductsApi } = useGetAllProducts();

  const router = useRouter();

  const productDataList = useSelector(
    (state: RootState) => state.productDataReducer.value
  );

  const cartDataList = useSelector(
    (state: RootState) => state.cartDataReducer.value
  );

  useEffect(() => {
    if (!productDataList[0].title) {
      getAllProductsApi();
    }
  }, []);

  useEffect(() => {
    if (cartDataList[0].id !== 0 && productDataList[0].id !== 0) {
      const savedCartDetails = productDataList.filter((item) => {
        if (cartDataList.find((itm) => itm.id === item.id)) {
          return item;
        }
      });

      if (savedCartDetails) {
        setCartValues(() =>
          savedCartDetails.map((item) => {
            const tempCartDataValue = cartDataList.find(
              (itm) => itm.id === item.id
            );

            return {
              itemDetails: item,
              qty: tempCartDataValue ? tempCartDataValue.qty.toString() : "",
            };
          })
        );
      }
    }
  }, [cartDataList, productDataList]);

  useEffect(() => {
    let tempTotal = 0;
    if (cartValue) {
      cartValue.forEach((item) => {
        if (parseInt(item.qty) > 1) {
          tempTotal = tempTotal + item.itemDetails.price * parseInt(item.qty);
        } else {
          tempTotal = tempTotal + item.itemDetails.price;
        }
      });
    }
    setTotalCartCost(() => tempTotal.toFixed(2).toString());
  }, [cartValue]);

  useEffect(() => {
    if (totalCartCost && totalCartCost !== "0") {
      setPaybleCost(totalCartCost);
    }
  }, [totalCartCost]);

  const handleDiscount = () => {
    if (discountCode.toUpperCase() === "DISC10") {
      setPaybleCost(() => (parseInt(totalCartCost) - 10).toString());
    } else if (discountCode.toUpperCase() === "DISC10%") {
      setPaybleCost(() =>
        (parseInt(totalCartCost) - parseInt(totalCartCost) * 0.1).toString()
      );
    } else {
      errorAlert(2000, "Wroking Codes Are:: DISC10, DISC10%");
    }
  };

  return (
    <div className="h-full p-5 flex flex-col gap-5 sm:flex-row overflow-hidden">
      <div className="h-full w-full flex flex-col gap-2 overflow-y-auto">
        {cartValue &&
          parseInt(cartValue[0].qty) !== 0 &&
          cartValue.map((items) => {
            return (
              <>
                <CartCard
                  name={items.itemDetails.title}
                  price={items.itemDetails.price.toString()}
                  rating={items.itemDetails.rating.toString()}
                  imgSrc={items.itemDetails.images[0]}
                  id={items.itemDetails.id.toString()}
                  qty={items.qty}
                />
              </>
            );
          })}
      </div>
      <div className="flex flex-col gap-2 sm:w-[30%]">
        <div className="flex justify-between">
          <div className="text-lg font-bold ">Bill</div>
          <button
            className="bg-gray-500 p-1 px-3 rounded-md text-white"
            onClick={() => setDiscountFLag(true)}
          >
            Add Discount
          </button>
        </div>
        {discountFlag && (
          <div className="flex justify-between">
            <input
              type="text"
              className="border"
              placeholder="DISC10, DISC10%"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className={primaryBtn} onClick={() => handleDiscount()}>
              Add
            </button>
            <button
              className={secondaryBtn}
              onClick={() => {
                setDiscountFLag(false), setPaybleCost(totalCartCost);
              }}
            >
              X
            </button>
          </div>
        )}
        <div className="text-sm sm:text-lg">
          Cart Total Amount(Rs): {totalCartCost}
        </div>
        {paybleCost && (
          <div className="text-sm sm:text-lg font-semibold">
            Payable Total Amount(Rs): {paybleCost}
          </div>
        )}
        <button
          className={`${primaryBtn} w-full`}
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
