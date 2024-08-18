import { ProductDataType } from "@/utils/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: 0,
      title: "",
      description: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: [""],
      brand: "",
      sku: "",
      weight: 0,
      dimensions: "",
      warrantyInformation: "",
      shippingInformation: "",
      availabilityStatus: "",
      reviews: "",
      minimumOrderQuantity: 0,
      images: [""],
      thumbnail: "",
    },
  ],
};

export const ProductListSlice = createSlice({
  name: "Products Slice",
  initialState: initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<ProductDataType[]>) => {
      if (action.payload) {
        state.value = action.payload;
      }
    },
  },
});

export const { setProductList } = ProductListSlice.actions;

export default ProductListSlice.reducer;
