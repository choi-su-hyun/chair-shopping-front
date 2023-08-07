import React from 'react';
import style from '../../css/ProductItem.module.scss';
import { useState } from 'react';

import Pagination from '../Pagination';

const ProductItem = ({ item }: any) => {
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  console.log(item);

  return (
    <div>
      <div>
        {/* <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label> */}
      </div>
      <div className={style.product_item}>
        {item.slice(offset, offset + limit).map((items: any) => {
          return (
            <div key={items.idx}>
              <div className={style.product_item__thumnail_wrap}>
                <div className={style.product_item__discount_rate}>
                  {items.product_discount}
                  <span className={style.product_item__discount_degree}>%</span>
                </div>
                <img
                  className={style.product_item__thumnail}
                  src={
                    process.env.REACT_APP_API_URL + items.image_thumnail_path
                  }
                  alt=""
                />
              </div>
              <div className={style.product_item__category}>
                {items.category_name}
              </div>
              <h5 className={style.product_item__title}>
                {items.product_name}
              </h5>
              <div className={style.product_item__price_wrap}>
                <p className={style.product_item__price_number}>
                  {items.product_price}{' '}
                  <span className={style.product_item__price_degree}>원</span>
                </p>
                <p className={style.product_item__for_discounted_price}>
                  {items.product_price} <span>원</span>
                </p>
              </div>
            </div>
          );
        })}
        <Pagination
          total={item.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ProductItem;
