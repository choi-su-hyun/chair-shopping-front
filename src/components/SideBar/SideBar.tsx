import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/admin-side-bar--home.svg';
import { ReactComponent as AddProduct } from '../../assets/admin-side-bar--add-product.svg';
import { ReactComponent as AddCategory } from '../../assets/admin-side-bar--add-category.svg';
import style from './SideBar.module.scss';

const SideBar = () => {
  return (
    <div className={style['side-back']}>
      <h3 className={style['admin-title']}>
        <span>안녕하세요.</span> <br />
        관리자 님!
      </h3>
      <Link to={'/admin-dashboard'} className={style['side__btn']}>
        <HomeIcon />
        <span>대시 보드</span>
      </Link>
      <Link to={'/admin-create'} className={style['side__btn']}>
        <AddProduct />
        <span>상품 추가</span>
      </Link>
      <Link to={'/admin-category-create'} className={style['side__btn']}>
        <AddCategory />
        <span>카테고리 추가</span>
      </Link>
    </div>
  );
};

export default SideBar;
