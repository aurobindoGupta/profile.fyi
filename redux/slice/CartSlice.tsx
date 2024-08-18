import { CartDataType } from "@/utils/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [{ id: 0, qty: 0 }],
};

export const CartListSlice = createSlice({
  name: "Cart Slice",
  initialState: initialState,
  reducers: {
    setCartList: (state, action: PayloadAction<CartDataType[]>) => {
      if (action.payload) {
        state.value = action.payload;
      }
    },
    addToCartList: (state, action: PayloadAction<CartDataType>) => {
      if (action.payload) {
        if (state.value[0]?.id) {
          state.value = [...state.value, action.payload];
        } else {
          state.value = [action.payload];
        }
      }
    },
    updateToCartList: (state, action: PayloadAction<CartDataType>) => {
      if (action.payload) {
        if (state.value[0].id) {
          state.value = state.value.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                qty: item.qty + 1,
              };
            } else return item;
          });
        }
      }
    },
    removeQtyCartList: (state, action: PayloadAction<CartDataType>) => {
      if (action.payload) {
        if (state.value[0].id) {
          state.value = state.value.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                qty: item.qty - 1,
              };
            } else return item;
          });
        }
      }
    },
    deleteProductCartList: (state, action: PayloadAction<CartDataType>) => {
      if (action.payload) {
        if (state.value[0].id) {
          state.value = state.value.filter((item) => {
            if (item.id !== action.payload.id) {
              return item;
            } else if (state.value.length === 1) {
              state = initialState;
            }
          });
        }
      }
    },
  },
});

export const {
  setCartList,
  addToCartList,
  updateToCartList,
  removeQtyCartList,
  deleteProductCartList,
} = CartListSlice.actions;

export default CartListSlice.reducer;
