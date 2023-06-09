import React from 'react';
import style from '../../css/ProductItem.module.scss';

const ProductItem = ({ item }: any) => {
  console.log(item);
  return (
    <div className={style.product_item}>
      {item.map((items: any) => {
        return (
          <div key={items.idx}>
            <div>
              <div>{items.product_discount}</div>
            </div>
            <div className={style.product_item__category}>
              {items.category_name}
            </div>
            <h5 className={style.product_item__title}>{items.product_name}</h5>
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
    </div>
  );
};

export default ProductItem;
