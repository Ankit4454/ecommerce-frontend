import { API_URLS } from "../utils/constant";

const customFetch = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getAllProducts = () => {
  return customFetch(API_URLS.products());
};

export const getLimitedProducts = (limit = 10) => {
  return customFetch(API_URLS.limitProducts(limit));
};

export const getAllCategories = () => {
  return customFetch(API_URLS.categories());
};

export const getCategoryProducts = (category) => {
  return customFetch(API_URLS.categoryProducts(category));
};
