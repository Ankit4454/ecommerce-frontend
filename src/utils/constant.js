const API_ROOT = "https://fakestoreapi.com";

export const API_URLS = {
  products: () => `${API_ROOT}/products`,
  limitProducts: (limit) => `${API_ROOT}/products?limit=${limit}`,
  categories: () => `${API_ROOT}/products/categories`,
  categoryProducts: (category) => `${API_ROOT}/products/category/${category}`,
};
