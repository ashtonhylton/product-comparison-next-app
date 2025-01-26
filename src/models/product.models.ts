export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Comparison {
  cheapest: boolean;
  highestRated: boolean;
}

export interface ComparedProduct {
  product: Product;
  comparison?: Comparison;
}

export interface ComparedProductsMap {
  [productId: string]: ComparedProduct;
}
