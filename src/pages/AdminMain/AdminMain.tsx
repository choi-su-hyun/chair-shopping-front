import React from 'react';
import AdminProductList from '../../components/posts/AdminProductList/AdminProductList';
import style from './AdminMain.module.scss';
import { Link } from 'react-router-dom';

const AdminMain = () => {
  return (
    <div>
      <div className={style['hero']}>
        <div className="container">
          <h1 className="page-content__title">안녕하세요 관리자님!</h1>
        </div>
      </div>
      <div className="container">
        <div>
          <div className={style['page-title-wrap']}>
            <h2 className="page-content__title main-page">
              현재 게시중인 상품 내역
            </h2>
          </div>
          <div className={style['side-bar__wrap']}>
            <div className={style['side-bar']}>
              <div className={style['side-bar__content']}>
                <ul>
                  <li>
                    <Link to={'/'}>상품 추가</Link>
                  </li>
                  <li>
                    <Link to={'/'}>카테고리 추가</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <AdminProductList />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
