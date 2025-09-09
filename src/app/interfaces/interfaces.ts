export interface Product {
  name: string;
  price: number;
  size: string,
  quantity: number
};

export interface ProductResponse {
  base_price: number;
  description: string;
  id: number;
  isActive: boolean;
  name: string;
  category: ProductCategories;
};

export interface ItemUpdate {
  quantityUpdate: number,
  productName: string,
  productSize: string
}

export interface ProductCategories {
  id: number;
  name: string;
  description: string;
}

export type Sizes =  'small' | 'large'


