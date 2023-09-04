import React, { useEffect, useRef, useState } from 'react';
import style from './detail-content.module.scss';
import useIntersectionObserver from '../../hooks/intersection-observer';

const DetailContent = ({ image }: { image: string }) => {
  const productInfoRef = useRef<HTMLDivElement>(null);
  const productReviewRef = useRef<HTMLDivElement>(null);
  const productInfoEntry = useIntersectionObserver({
    ref: productInfoRef,
    options: { threshold: 0.5 },
  });
  const productReviewEntry = useIntersectionObserver({
    ref: productReviewRef,
    options: { threshold: 0.5 },
  });

  const [currentTab, setCurrentTab] = useState<string>('');
  const goTabContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetedButton = e.currentTarget.id;
    if (targetedButton === 'tab1') {
      productInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (targetedButton === 'tab2') {
      return productReviewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  };

  useEffect(() => {
    if (productReviewEntry?.isIntersecting) {
      setCurrentTab('reviews');
      return;
    }
    if (productInfoEntry?.isIntersecting) {
      setCurrentTab('info');
      return;
    }
  }, [productInfoEntry, productReviewEntry]);

  return (
    <div className={style['detail-content']}>
      <div className={style['detail-tab']}>
        <button
          onClick={goTabContent}
          className={currentTab === 'info' ? style['current-tab'] : ''}
          id="tab1"
        >
          상품 설명
        </button>
        <button
          onClick={goTabContent}
          id="tab2"
          className={currentTab === 'reviews' ? style['current-tab'] : ''}
        >
          상품 리뷰
        </button>
      </div>
      <div>
        <div id="contents-1" ref={productInfoRef}>
          <img
            src={process.env.REACT_APP_API_URL + image}
            alt=""
            height={1200}
          />
          새로운 글
        </div>
        <div
          ref={productReviewRef}
          // ref={(el) => (tabRef.current[1] = el)}
          id="contents-2"
          style={{ height: '800px' }}
        >
          두번째 글
        </div>
        <div id="test">세번째 글</div>
      </div>
    </div>
  );
};

export default DetailContent;
