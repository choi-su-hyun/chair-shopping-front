import React, { useState } from 'react';
import style from './OrderPage.module.scss';
import { useQuery } from 'react-query';
import { getCartList } from '../../api/post';
import CartItem from '../../components/posts/CartItem/CartItem';
import { discountPrice } from '../../utils/discountPrice';
import DaumPostcode from 'react-daum-postcode';
import { ReactComponent as CloseBtn } from '../../assets/close-btn.svg';
import { IorderData } from '../../types/order';
import { IPostCode } from '../../types/postcode';

const OrderPage = () => {
  const [countPrice, setCountPrice] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<IorderData>({
    zoneCode: '',
    address: '',
    detailAddress: '',
  });

  const { zoneCode, address, detailAddress } = orderData;
  const orderDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };
  const { data } = useQuery('getCart', async () => {
    return await getCartList().then((res) => {
      const data = res.data.content;
      let sum = 0;
      for (let item of data) {
        let productPrice =
          Number(discountPrice(item.product_price, item.product_discount)) *
          item.cart_qty;
        sum = sum + productPrice;
      }
      setCountPrice(sum);
      return res.data.content;
    });
  });

  const handleComplete = (data: IPostCode) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setOrderData({
      ...orderData,
      zoneCode: data.zonecode,
      address: fullAddress,
    });
    setVisible(false);
  };
  const openPostCode = () => {
    setVisible(true);
  };
  const closePostCode = () => {
    setVisible(false);
  };

  const orderProduct = () => {
    const { IMP } = window;
    IMP.init('imp17611641');

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: 'example@example', // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018',
    };
    IMP.request_pay(data, impOrder);
  };
  const impOrder = (response: any) => {
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };
  console.log('data', data);
  if (data == undefined) return null;
  return (
    <div>
      <div className={style['order-hero']}>
        <div className="container">
          <h1>주문하기</h1>
        </div>
      </div>
      <div className="container">
        <div className={style['order-sub-title']}>
          <h4>주문 내용</h4>
        </div>
        <div className={style['cart-table']}>
          <CartItem items={data} countPrice={countPrice} pageName="order" />
        </div>
        <div className={style['order-sub-title']}>
          <h4>배송 정보</h4>
        </div>
        <div className={style['order-input-wrap']}>
          <div className="input-wrap--has-label">
            <label htmlFor="">주소</label>
            <div className={style['input-wrap']}>
              <div className={style['post-code']}>
                <div className={style['post-code--text-wrap']}>
                  <input
                    type="text"
                    className="input--only-input"
                    name="zoneCode"
                    value={zoneCode}
                    onChange={orderDataHandler}
                  />
                </div>
                <button
                  className="general-btn--text block-btn"
                  onClick={openPostCode}
                >
                  우편번호 검색하러가기
                </button>
              </div>
              <div className={style['input-wrap']}>
                <input
                  type="text"
                  className="input--only-input"
                  placeholder="주소를 작성하세요"
                  value={address}
                  name="address"
                  onChange={orderDataHandler}
                />
                <input
                  type="text"
                  className="input--only-input"
                  placeholder="상세주소를 작성하세요"
                  name="detailAddress"
                  value={detailAddress}
                  onChange={orderDataHandler}
                />
              </div>
            </div>
          </div>
          <div className={style['btn-wrap']}>
            <button onClick={orderProduct} className="cta-btn--block">
              결제하기
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <div className={style['daum-post-code-popup-wrap']}>
          <div>
            <div
              onClick={closePostCode}
              className={style['daum-post-code-popup__back']}
            ></div>
            <div className={style['daum-post-code-popup__content']}>
              <div className={style['btn-wrap--arrange-right']}>
                <button onClick={closePostCode} className="round-btn general">
                  <CloseBtn />
                </button>
              </div>
              <DaumPostcode
                onComplete={handleComplete}
                className={style['daum-post-code-popup']}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
