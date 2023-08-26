import React from 'react';

interface IProductData {
  idx: number;
  category_idx: number;
  product_idx: number;
  category_name: string;
  product_name: string;
  product_description: string;
  image_thumnail_path: string;
  image_detail_path: string;
  product_discount: number;
  product_price: string;
}

interface IProductOptionDB {
  idx: number | null;
  option_name: string;
  inventory: number;
}
interface IProductOptionData {
  [key: string | number]: string | number | undefined;
  optionName: string;
  inventory: number | undefined;
}
interface IProductPagination {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
interface IProductIdx {
  idx: string | undefined;
}

export type {
  IProductData,
  IProductOptionDB,
  IProductOptionData,
  IProductPagination,
  IProductIdx,
};
