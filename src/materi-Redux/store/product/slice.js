import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, getProductDetail } from "./action";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        entities: [],
        entity: {
            createdAt: '',
            image: '',
            title: '',
            description: '',
            price: '',
        },
        error: null,    
    },
    extraReducers: (builder) => 
    builder
    .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
    })
    .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload
    })
    .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })
    // detail product
    .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
    })
    .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload
    })
    .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })
})

export default productSlice.reducer;