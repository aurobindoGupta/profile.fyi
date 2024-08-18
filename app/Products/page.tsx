"use client";
import ProductCard from "@/components/productCard/ProductCard";
import useGetAllProducts from "@/hooks/getAllProducts";
import { RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Products() {
  const { getAllProductsApi } = useGetAllProducts();

  const productDataList = useSelector(
    (state: RootState) => state.productDataReducer.value
  );

  useEffect(() => {
    getAllProductsApi();
  }, []);

  // useEffect(() => {}, [productDataList]);
  // console.log({ yoyoyo: productDataList });

  return (
    <div>
      <div className="p-2 flex justify-center gap-5 flex-wrap">
        {productDataList.length > 1 &&
          productDataList.map((items) => {
            return (
              <>
                <ProductCard
                  name={items.title}
                  price={items.price.toString()}
                  rating={items.rating.toString()}
                  imgSrc={items.images[0]}
                  id={items.id.toString()}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}
