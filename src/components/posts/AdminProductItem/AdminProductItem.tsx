import React, { useState } from 'react';
import { IProductData } from '../../../types/product';
import style from './AdminProductItem.module.scss';
import { Link } from 'react-router-dom';

const AdminProductItem = ({ items }: { items: IProductData[] }) => {
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;
  return (
    <div>
      {items.slice(offset, offset + limit).map((mapItems) => {
        return (
          <div key={mapItems.idx} className={style['product-list']}>
            <img
              src={process.env.REACT_APP_API_URL + mapItems.image_thumnail_path}
              alt=""
            />
            <div className={style['product-list__text-wrap']}>
              <span className="category">{mapItems.category_name}</span>
              <h4>{mapItems.product_name}</h4>
              <div className={style['price']}>
                <span>
                  {mapItems.product_price}{' '}
                  <span className={style['price-degree']}>원</span>
                </span>
              </div>
              <span className={style['discount']}>
                {mapItems.product_discount} %
              </span>
            </div>
            <div>
              <Link
                to={`/admin-product/${mapItems.idx}`}
                className="general-btn--text"
              >
                상세히 보기
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminProductItem;
