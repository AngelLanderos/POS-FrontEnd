export interface Product {
  name: string;
  price: number;
  size: string,
  quantity: number
};

export interface ItemUpdate {
  quantityUpdate: number,
  productName: string,
  productSize: string
}

export type Sizes =  'small' | 'large'
