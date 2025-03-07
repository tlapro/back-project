import { products } from './products';

export const categories = [
  ...new Set(products.map((product) => product.category)),
];
