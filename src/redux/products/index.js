import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const API = "https://6x8prpit9f.execute-api.us-east-1.amazonaws.com/api";
const KEY = 'wW8WzxP6124YiMcSVcDVq4QD7J5Zdp498XQfBVYP';

export const fetchCategories = createAsyncThunk('products/fetchCategories',
    async (_, thunkAPI) => {
        const { requestId, getState, rejectWithValue } = thunkAPI;
        const { solicitudID } = getState().products;
        let categories = [];

        if (requestId !== solicitudID) return;

        await axios({
            method: 'get',
            url: API + '/categories',
            headers: {
                'x-api-key': KEY
            }
        }).then(function (response) {
            categories = response.data.items;
        }).catch(function (error) {
            return rejectWithValue({ error });
        });

        return categories;
    }
)

export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async (args, thunkAPI) => {
        const { requestId, getState, rejectWithValue, signal } = thunkAPI;
        const { solicitudID } = getState().products;
        let products = [];

        if (requestId !== solicitudID) return;

        await axios({
            method: 'get',
            url: API + '/products',
            headers: {
                'x-api-key': KEY
            },
            params: {
                category: args?.category,
                q: args?.query
            },
            signal,
        }).then(function (response) {
            products = response.data.items;
        }).catch(function (error) {
            return rejectWithValue({ error });
        });

        return products;
    }
)

const initialState = {
    loading: false,
    products: [],
    favorites: [],
    cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0
    },

    categories: [],
    error: '',
    solicitudID: null,
    showFavorites: false
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state, action) {
            if (state.cart.items.some(item => item.id === action.payload)) {
                const productInCart = state.cart.items.find(item => item.id === action.payload);
                const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
                state.cart.items = [...filteredItems, { ...productInCart, quantity: productInCart.quantity + 1 }];
                state.cart.totalPrice = state.cart.totalPrice + productInCart.price;
            } else {
                const product = state.products.find(item => item.id === action.payload);
                state.cart.items.push({ ...product, quantity: 1 });
                state.cart.totalPrice = state.cart.totalPrice + product.price;
            }
            state.cart.totalItems = state.cart.totalItems + 1
        },
        deleteItem(state, action) {
            if (state.cart.items.some(item => item.id === action.payload)) {
                const productInCart = state.cart.items.find(item => item.id === action.payload);
                const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
                if (productInCart.quantity === 1) {
                    state.cart.items = filteredItems
                } else {
                    state.cart.items = [...filteredItems, { ...productInCart, quantity: productInCart.quantity - 1 }]
                }
                state.cart.totalPrice = state.cart.totalPrice - productInCart.price;
            }
            state.cart.totalItems = state.cart.totalItems - 1;
        },
        deleteCart(state, action) {
            if (state.cart.items.some(item => item.id === action.payload)) {
                const productInCart = state.cart.items.find(item => item.id === action.payload);
                const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
                const price = productInCart.quantity * productInCart.price;

                state.cart.items = filteredItems;
                state.cart.totalItems = state.cart.totalItems - productInCart.quantity;
                state.cart.totalPrice = state.cart.totalPrice - price;
            }
        },
        addToFavorites(state, action) {
            state.favorites.push(state.products.find(item => item.id === action.payload));
        },
        deleteFromFavorites(state, action) {
            state.favorites = state.favorites.filter(item => item.id !== action.payload);
        },
        setShowFavorites(state, action) {
            state.showFavorites = action.payload;
        }

    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.error = false;
            state.loading = !state.loading && true;
            state.solicitudID = action.meta.requestId;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action?.payload;
            state.loading = state.loading && false;
            state.solicitudID = undefined;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = state.loading && false;
            state.solicitudID = undefined;
        },
        [fetchCategories.pending]: (state, action) => {
            state.error = false;
            state.loading = !state.loading && true;
            state.solicitudID = action.meta.requestId;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories = action?.payload;
            state.loading = state.loading && false;
            state.solicitudID = undefined;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = state.loading && false;
            state.solicitudID = undefined;
        },

    }
})


export const { addToCart, deleteCart, deleteItem, addToFavorites, deleteFromFavorites, setShowFavorites } = productsSlice.actions;

export const getProducts = state => state.products.products;
export const getLoadingProducts = state => state.products.loading;
export const getItemsCart = state => state.products.cart.items;
export const getCategories = state => state.products.categories;
export const getTotalItems = state => state.products.cart.totalItems;
export const getTotalFavoriteItems = state => state.products.favorites;
export const getTotalPrice = state => state.products.cart.totalPrice;
export const getFavorites = state => state.products.favorites;
export const getShowFavorites = state => state.products.showFavorites;


export default productsSlice.reducer;