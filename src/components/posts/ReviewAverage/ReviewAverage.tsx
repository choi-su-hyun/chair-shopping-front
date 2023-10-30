import React from 'react';
import style from './ReviewAverage.module.scss';
import { getReviewAverage } from '../../../api/post';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../../assets/star.svg';

const ReviewAverage = () => {
  const { id } = useParams();
  const { data } = useQuery('getReviewAverage', async () => {
    const productData = { productId: id };
    return await getReviewAverage(productData).then((res) => res.data.contents);
  });
  console.log('리뷰 평균 값', data);

  if (data == undefined) return null;
  return (
    <div>
      <div className={style['review-average-wrap']}>
        <div className={style['review-average-left-wrap']}>
          <div className={style['score']}>
            <h6>평점</h6>
            <span className={style['score-num']}>
              {Math.floor(data.review_average)}
              <span className={style['score-num-degree']}>/5</span>
            </span>
          </div>
          <div className={style['star']}>
            {Array(Math.floor(data.review_average))
              .fill(0)
              .map((item, index) => {
                return <StarIcon key={index} className={style['star--on']} />;
              })}
            {Array(5 - Math.floor(data.review_average))
              .fill(0)
              .map((item, index) => {
                return <StarIcon key={index} className={style['star--off']} />;
              })}
          </div>
        </div>
        <div className={style['review-average-right-wrap']}>
          <h6>리뷰 수</h6>
          <span>{data.review_count}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewAverage;
