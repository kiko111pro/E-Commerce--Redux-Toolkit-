import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./product.service";
import { current } from "@reduxjs/toolkit";

const fetchCartfromLocalStorage = () =>
  JSON.parse(localStorage.getItem("CART"));

const initialState = {
  getProducts: [],
  productsInCart: fetchCartfromLocalStorage() || [],
  totalProductsInCart: 0,
  totalAmount: 0,
  loading: false,
  isError: false,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (payload, thunkAPI) => {
    const response = await getProducts();
    if (response.isSuccess) return response.result;

    return thunkAPI.rejectWithValue(response.result);
  }
);

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const passedProduct = action.payload;
      const foundItem = state.getProducts.find(
        (item) => item.id === passedProduct.id
      );

      state.productsInCart = [
        ...state.productsInCart,
        { ...foundItem, quantity: 1 },
      ];
    },
    incrementProductQuantity: (state, action) => {
      const productId = action.payload;
      const itemIndex = current(state).productsInCart.findIndex(
        (item) => item.id === productId
      );
      state.productsInCart[itemIndex].quantity += 1;
    },
    decrementProductQuantity: (state, action) => {
      const productId = action.payload;
      const itemIndex = current(state).productsInCart.findIndex(
        (item) => item.id === productId
      );
      if (state.productsInCart[itemIndex].quantity === 1) {
        const filteredItems = state.productsInCart.filter(
          (item) => item.id !== productId
        );
        state.productsInCart = filteredItems;
      } else {
        state.productsInCart[itemIndex].quantity -= 1;
      }
    },
    getTotal: (state, action) => {
      const totalAmount = current(state).productsInCart.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      state.totalAmount = totalAmount.toFixed(2);

      state.totalProductsInCart = current(state).productsInCart.reduce(
        (a, b) => a + b.quantity,
        0
      );
    },
    reset: (state, action) => {
      state.getProducts = [];
      state.productsInCart = [];
      state.totalProductsInCart = 0;
      state.totalAmount = 0;
      state.loading = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.getProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {
  addProduct,
  incrementProductQuantity,
  decrementProductQuantity,
  getTotal,
  reset,
} = product.actions;
export default product.reducer;
