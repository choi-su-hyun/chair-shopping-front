import React from 'react';
import style from '../../css/ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addComma } from '../../utils/addComma';

import Pagination from '../Pagination';

const ProductItem = ({ item }: any) => {
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <div>
      <div className={style.product_item}>
        {item.slice(offset, offset + limit).map((items: any) => {
          return (
            <div key={items.idx}>
              <Link className="block-link" to={`/product/${items.idx}`}>
                <div className={style.product_item__thumnail_wrap}>
                  <div className={style.product_item__discount_rate}>
                    {items.product_discount}
                    <span className={style.product_item__discount_degree}>
                      %
                    </span>
                  </div>
                  <img
                    className={style.product_item__thumnail}
                    src={
                      process.env.REACT_APP_API_URL + items.image_thumnail_path
                    }
                    alt=""
                  />
                </div>
                <div className={style.product_item__content_wrap}>
                  <div className="category">{items.category_name}</div>
                  <h5 className={style.product_item__title}>
                    {items.product_name}
                  </h5>
                  <div className={style.product_item__price_wrap}>
                    <p className={style.product_item__price_number}>
                      {addComma(items.product_price)}{' '}
                      <span className={style.product_item__price_degree}>
                        원
                      </span>
                    </p>
                    <p className={style.product_item__for_discounted_price}>
                      {addComma(items.product_price)} <span>원</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination
        total={item.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductItem;
