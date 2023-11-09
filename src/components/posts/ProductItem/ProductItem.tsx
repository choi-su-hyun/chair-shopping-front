import React from 'react';
import style from './ProductItem.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { addComma } from '../../../utils/addComma';
import { IProductData } from '../../../types/product';
import { discountPrice } from '../../../utils/discountPrice';

import Pagination from '../../Pagination/Pagination';

const ProductItem = ({ item }: { item: IProductData[] }) => {
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  // console.log('item 값', item);
  return (
    <div>
      <div className={style.product_item}>
        {item.slice(offset, offset + limit).map((items: IProductData) => {
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
                    className={style['product_item__thumnail']}
                    width={360}
                    height={270}
                    src={
                      process.env.REACT_APP_API_URL + items.image_thumnail_path
                    }
                    alt=""
                  />
                </div>
                <div className={style.product_item__content_wrap}>
                  {/* <div className={style['product_item__top-wrap']}> */}
                  <div className="category">{items.category_name}</div>

                  {/* </div> */}
                  <h5 className={style.product_item__title}>
                    {items.product_name}
                  </h5>
                  <div className={style.product_item__price_wrap}>
                    <p className={style.product_item__price_number}>
                      {addComma(
                        discountPrice(
                          items.product_price,
                          items.product_discount,
                        ),
                      )}{' '}
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
