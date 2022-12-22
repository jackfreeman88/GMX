import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';

const initialState = {
    brandId: '',
    totalItems: 0,
    products: [],
    status: 'idle',
    updateStatus: 'idle',
    error: ''
}

export const fetchCartProducts = createAsyncThunk('cart/fetchProducts', async () => {
    const response = await Rest.axiosRequest(API.getCartItems, {}, 'GET')
    return response.data.data
})

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (productData, { rejectWithValue }) => {
    const response = await Rest.axiosRequest(API.addToCart, productData)
    if (response.data.status) {
        return response.data.data
    } else {
        return rejectWithValue(response.data);
    }
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartId) => {
    const response = await Rest.axiosRequest(API.removeFromCart, { cartId }, 'DELETE')
    return response.data.data
})

export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async (data) => {
    const response = await Rest.axiosRequest(API.updateCartItem, data, 'PUT')
    return response.data.data
})

const cartSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // addToCart: (state, action) => {
        //     const { product } = action.payload;
        //     const existingBrandId = state['brandId'] === product.brandId;
        //     if (existingBrandId) {
        //         const existingProduct = state.products.find(cartProduct => cartProduct.id === product.id);
        //         if (existingProduct) {
        //             existingProduct.quantity = existingProduct.quantity + product.quantity;
        //         } else {
        //             state['products'].push({ ...product })
        //         }
        //     } else {
        //         state.brandId = product.brandId;
        //         state.products = [{ ...product }]
        //     }
        // },
        // removeFromCart: (state, action) => {
        //     return state.products.filter(item => item.id !== action.payload)
        // }
        resetCart: (state) => {
            return initialState;
        }
    },
    extraReducers(builders) {
        builders
            .addCase(fetchCartProducts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                updateCart(state, action);
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addProductToCart.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                // state.status = 'succeeded'
                // const { product } = action.payload;
                // const existingBrandId = state['brandId'] === product.brandId;
                // if (existingBrandId) {
                //     const existingProduct = state.products.find(cartProduct => cartProduct.productId === product.productId);
                //     if (existingProduct) {
                //         existingProduct.quantity = product.quantity;
                //     } else {
                //         state['products'].push({ ...product, cartId: product.id })
                //     }
                //     state.totalItems = state.products.reduce((total, currentItem) => (total += currentItem.quantity), 0)
                // } else {
                //     state.brandId = product.brandId;
                //     state.totalItems = product.quantity;
                //     state.products = [{ ...product, cartId: product.id }];
                // }
                updateCart(state, action);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(removeFromCart.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                updateCart(state, action);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateItemQuantity.pending, (state, action) => {
                state.updateStatus = 'loading'
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                const { action: selectedAction, cartId, quantity } = action.payload
                state.updateStatus = 'succeeded'
                const cartProduct = state.products.find(cartProduct => cartProduct.cartId === cartId);
                cartProduct.quantity = quantity;
                state.totalItems = state.products.reduce((total, currentItem) => (total += currentItem.quantity), 0)
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.updateStatus = 'failed'
                state.error = action.error.message
            })
    }
})

const updateCart = (state, action) => {
    state.status = 'succeeded'
    state.error = ''
    const { brandId, cartItems, totalItems } = action.payload;
    state.brandId = brandId;
    state.totalItems = parseInt(totalItems)
    const products = cartItems.map((item) => {
        return (
            {
                cartId: item.id,
                productId: item.product.id,
                title: item.product?.title,
                categoryTitle: item.product.category?.title,
                harvested: item.product.harvested,
                quantity: item.quantity,
            }
        )
    })
    state.products = [...products]
}

// export const { addToCart, removeFromCart } = cartSlice.actions;
export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;