import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../../utils/service";
import { GET_ALL_PRODUCT, GET_PRODUCT_DETAIL } from "../../utils/constant";

export const getAllProduct = createAsyncThunk(
  GET_ALL_PRODUCT,
  async (param) => {
    try {
      const response = await httpService.get(`/products/search?q=${param}&limit=52`);
      return response.data.products;
    } catch (error) {
      return error;
    }
  }
);

export const getProductDetail = createAsyncThunk(
    GET_PRODUCT_DETAIL,
    async (productId) => {
      try {
        const response = await httpService.get(`/product/${productId}`);
        return response.data.product;
      } catch (error) {
        return error;
      }
    }
  );
  