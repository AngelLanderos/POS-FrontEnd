export interface Product {
  id: number;
  name: string;
  price: number;
  size: string,
  quantity: number,

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

export interface BarTable {
  created_at: Date;
  id: number;
  status: string;
  table_number: number;
  provisionalTotal: number;
}

export interface ItemsResponse {
    name: string,
    quantity: number,
    unit_price: number,
    table_id: number,
    order_item_id: number,
    paid_quantity: number
};

const TABLE_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  NEEDS_CLEANING: "needs_cleaning",
  RESERVED: "reserved",
  BLOCKED: "blocked",
};

// export interface ProductToBarSale {
//   product
// };
