import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../src/api/api";

interface ProductsState {
  items: Cat[];
  favoriteItems: Cat[];
  loading: boolean;
  error: string | null;
}

export interface Cat {
  id: string;
  name: string;
  origin: string;
  description: string;
  reference_image_id: string;
  imgUrl?: string;
}

const initialState: ProductsState = {
  items: [],
  favoriteItems: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "items/fetchProducts",
  async () => {
    const data = getProducts();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Cat>) => {
      if (state.favoriteItems.find((obj) => obj.id === action.payload.id)) {
        state.favoriteItems = state.favoriteItems.filter(
          (obj) => obj.id !== action.payload.id
        );
      } else {
        state.favoriteItems = [action.payload, ...state.favoriteItems];
      }
    },
    createProduct: (state, action: PayloadAction<Cat>) => {
      state.items = [action.payload, ...state.items];
    },
    editProduct: (state, action: PayloadAction<Cat>) => {
      state.items = state.items.map((obj) => obj.id===action.payload.id ? action.payload : obj);
      state.favoriteItems = state.favoriteItems.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      );
    },
    deleteProduct: (state, action: PayloadAction<Cat>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.favoriteItems = state.favoriteItems.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке данных";
      });
  },
});

export const { addFavoriteProduct, deleteProduct, createProduct, editProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
