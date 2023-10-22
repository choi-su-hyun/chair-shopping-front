import React, { useState, useEffect } from 'react';
import style from './ReviewItem.module.scss';
import { getReviewList } from '../../../api/post';
import { useParams } from 'react-router-dom';
import { IreviewList } from '../../../types/review';
import { changeKrFormate } from '../../../utils/dateFormater';
import { ReactComponent as StarIcon } from '../../../assets/star.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit-btn.svg';
import { useQuery, useMutation } from 'react-query';
import reviewDefaultImg from '../../../assets/review-default-img.png';
import { getUserInfo } from '../../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

const ReviewItem = () => {
  const [reviewList, setReviewList] = useState<IreviewList[]>([]);
  const [userIndex, setUserIndex] = useState<number | null>(null);
  let { id } = useParams();
  const productData = { productId: id };
  const isLogin = useSelector((state: RootState) => state.userAuth);
  // const testFunction = (productData) => {
  //   getReviewList(productData).then((response) => response);
  // };

  // const mutation = useMutation((): any => {
  //   getReviewList(productData).then((response) => response);
  // });
  // console.log('mutation', mutation);
  // const { mutate } = useMutation((productData) => {
  //   getReviewList(productData).then((response) => response);
  // });
  const { data } = useQuery<IreviewList[]>({
    queryKey: ['post'],
    queryFn: async (): Promise<any> => {
      if (id !== undefined) {
        const productData = { productId: id };
        return getReviewList(productData).then(
          (response) => response.data.contents,
        );
      } else {
        return new Promise((resolve) => resolve(null));
      }
    },
  });
  // console.log('data', data);
  // async () => {
  //   if (productData?.productId !== undefined) {
  //     const result = await getReviewList(productData);
  //     return result;
  //   }
  //   // return new Promise();
  // },

  useEffect(() => {
    // if (id != undefined) {
    //   const productData = { productId: id };
    //   getReviewList(productData)
    //     .then((response) => {
    //       // console.log('response', response);
    //       setReviewList(response.data.contents);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    if (isLogin.user_token) {
      getUserInfo().then((res) => {
        console.log('res정보', res);
        setUserIndex(res.data.contents.idx);
      });
    }
  }, [isLogin.user_token]);
  // console.log('reviewList', reviewList);
  if (data == undefined) return null;
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div className={style['review']} key={index}>
            <div className={style['text-content-wrap']}>
              <div className={style['info-wrap']}>
                <div className={style['info-wrap__title-and-user']}>
                  <h4>{item.title}</h4>|<span>{item.user_name}</span>
                </div>
                <div className={style['info-wrap__date-wrap']}>
                  <span>{changeKrFormate(item.created_date)}</span>
                </div>
              </div>
              <p>{item.paragraph}</p>
              <div className={style['review-bottom-wrap']}>
                <div className={style['star']}>
                  {Array(item.evaluation_star)
                    .fill(0)
                    .map((item, index) => {
                      return (
                        <StarIcon key={index} className={style['star--on']} />
                      );
                    })}
                  {Array(5 - item.evaluation_star)
                    .fill(0)
                    .map((item, index) => {
                      return (
                        <StarIcon key={index} className={style['star--off']} />
                      );
                    })}
                </div>
                <div>
                  {item.user_idx == userIndex ? (
                    <button>
                      <EditIcon className={style['review-edit-btn']} />
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className={style['image-wrap']}>
              {item.review_image_path ? (
                <img
                  src={
                    (process.env.REACT_APP_API_URL
                      ? process.env.REACT_APP_API_URL
                      : '') + item.review_image_path
                  }
                  alt=""
                />
              ) : (
                <img src={reviewDefaultImg} alt="" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewItem;
