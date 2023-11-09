import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail, getProductOption } from '../../../api/post';
import style from './AdminProductDetail.module.scss';
import { addComma } from '../../../utils/addComma';
import { discountPrice } from '../../../utils/discountPrice';
import { IProductOptionDB } from '../../../types/product';
import { ReactComponent as EditIcon } from '../../../assets/edit-btn.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/trash-icon.svg';
import { ReactComponent as BottomLogo } from '../../../assets/secondary-color-logo.svg';
import { useDispatch } from 'react-redux';
import { saveNewPopup } from '../../../redux/alertPopup/action';
import alertImg from '../../../assets/alert-popup-img.png';

const AdminProductDetail = () => {
  const { id } = useParams();
  const productIdx = { productId: id };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useQuery('getProductDetail', async (): Promise<any> => {
    return await getProductDetail(productIdx).then(
      (res) => res.data.contents[0],
    );
  });
  const getOptionData = useQuery<IProductOptionDB[]>(
    'getOption',
    async (): Promise<any> => {
      return await getProductOption(productIdx).then(
        (res) => res.data.contents,
      );
    },
  );
  const goEditPage = () => {
    navigate(`/admin-edit-product/${id}`);
  };
  const deleteProduct = () => {
    const popupData = {
      image: alertImg,
      title: '정말 상품을 삭제하시겠습니까?',
      paragraph: '삭제버튼을 클릭 시 해당 상품이 삭제됩니다.',
      ctaBtn: '삭제',
      currentProductId: id,
      popupController: true,
    };
    dispatch(saveNewPopup(popupData));
  };

  // console.log('data 값 확인중', data);
  // console.log('getOptionData 값 확인중', getOptionData);
  if (data == null || getOptionData.data == null) {
    return null;
  }
  return (
    <div className={style['detail-page']}>
      <div className={style['banner']}>
        <h1>
          게시된{' '}
          <span className={style['title']}>
            &apos;{data.product_name}&apos;
          </span>{' '}
          상세
        </h1>
      </div>
      <div>
        <div className={style['top-btn-wrap']}>
          <button
            className="cta-btn--block have-icon admin"
            onClick={goEditPage}
          >
            <EditIcon /> 수정하기
          </button>
          <button
            className="cta-btn--block have-icon admin"
            onClick={deleteProduct}
          >
            <DeleteIcon /> 상품 삭제하기
          </button>
        </div>
        <div className={style['product-detail']}>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>상품 제목</span>
            <h2 className={style['data-wrap__value']}>{data.product_name}</h2>
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>썸네일 사진</span>
            <img
              className={style['thumnail-image']}
              src={process.env.REACT_APP_API_URL + data.image_thumnail_path}
              alt=""
            />
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>카테고리</span>
            <span className="category">{data.category_name}</span>
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>상품 설명</span>
            <p className={style['data-wrap__value']}>
              {data.product_description}
            </p>
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>할인율</span>
            <span className={style['data-wrap__value']}>
              {data.product_discount}
              <span className={style['detail-main__table-value-degree']}>
                {' '}
                %
              </span>
            </span>
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>색상 & 재고</span>
            <div>
              {getOptionData.data.map((item: IProductOptionDB) => {
                return (
                  <div key={item.idx} className={style['option-item']}>
                    색상: ({item.option_name}) 재고: ({item.inventory})
                  </div>
                );
              })}
            </div>
            {getOptionData.isLoading ? <div>로딩중...</div> : ''}
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>원가</span>
            <span className={style['data-wrap__value']}>
              {addComma(Number(data.product_price))} 원
            </span>
          </div>
          <div className={style['data-wrap']}>
            <span className={style['data-wrap__title']}>판매가</span>
            <span className={style['data-wrap__value']}>
              <b>
                {addComma(
                  discountPrice(
                    Number(data.product_price),
                    data.product_discount,
                  ),
                )}{' '}
                원
              </b>
            </span>
          </div>
          <div className={style['detail-bottom']}>
            <BottomLogo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;
