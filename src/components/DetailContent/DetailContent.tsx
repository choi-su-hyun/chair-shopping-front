import React from 'react';
import style from './detail-content.module.scss';

const DetailContent = ({ image }: { image: string }) => {
  return (
    <div>
      <div className={style['detail-tab']}>
        <a href="#test1">상품 설명</a>
        <a href="#test2">상품 리뷰</a>
      </div>
      <div>
        <img src={process.env.REACT_APP_API_URL + image} alt="" />
        <div id="test1" style={{ height: '800px' }}>
          새로운 글
        </div>
        <div id="test2" style={{ height: '800px' }}>
          두번째 글
        </div>
      </div>
    </div>
  );
};

export default DetailContent;
