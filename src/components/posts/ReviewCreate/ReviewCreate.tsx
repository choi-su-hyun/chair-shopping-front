import React, { useState, useRef } from 'react';
import { ReactComponent as StarIcon } from '../../../assets/star.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/success.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/error.svg';
import { useParams } from 'react-router-dom';
import style from './ReviewCreate.module.scss';
import { createReview } from '../../../api/post';
import { useMutation, useQueryClient } from 'react-query';

const ReviewCreate = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];
  const [imageFile, setImageFile] = useState<File | string>();
  const [title, setTitle] = useState<string>('');
  const [paragraph, setParagraph] = useState<string>('');
  const [noticeStarRate, setNoticeStarRate] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<boolean>(false);
  const [reviewResultController, setReviewResultController] =
    useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const pageId = useParams();
  const starPointHandler = (item: number) => {
    let clickState = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickState[i] = i <= item ? true : false;
    }
    setClicked([...clickState]);
  };
  let starScore = clicked.filter(Boolean).length;
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const imageFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    } else if (e.target.files !== undefined) {
      setImageFile(e.target.files[0]);
    }
  };
  const paragraphHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraph(e.target.value);
  };
  const initForm = () => {
    setTitle('');
    setParagraph('');
    if (fileInput.current != null) {
      fileInput.current.value = '';
    }
    setClicked(Array(5).fill(false));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: FormData) => {
      return await createReview(data);
    },
    {
      onSuccess: (newQueryData) => {
        console.log('newQueryData 값', newQueryData);
        queryClient.setQueryData(
          'getReviewlist',
          newQueryData.data.contents.review,
        );
        queryClient.setQueryData(
          'getReviewAverage',
          newQueryData.data.contents.reviewAverage,
        );
      },
    },
  );
  const submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile != null) {
      formData.append('reviewImage', imageFile);
    }
    formData.append(
      'reviewTextData',
      JSON.stringify({
        reviewTitle: title,
        reviewStarRate: starScore,
        reviewParagraph: paragraph,
        productId: pageId,
      }),
    );
    if (!clicked[0]) {
      setNoticeStarRate(true);
      return;
    } else {
      setNoticeStarRate(false);
    }
    try {
      // createReview(formData);
      mutation.mutate(formData);
      setReviewResultController(true);
      setReviewResult(true);
    } catch (error) {
      setReviewResultController(true);
      setReviewResult(false);
    } finally {
      initForm();
      setTimeout(() => {
        setReviewResultController(false);
      }, 3000);
    }
  };
  return (
    <div>
      <form onSubmit={submitReview} className={style['review-form']}>
        <div className="input-wrap--include-label">
          <label htmlFor="">리뷰 제목</label>
          <input
            className="input--only-input admin"
            type="text"
            placeholder="리뷰 제목을 입력해주세요."
            onChange={titleHandler}
            required
            value={title}
          />
        </div>
        <div className="input-wrap--include-label">
          <label htmlFor="">첨부 이미지</label>
          <input
            className="input--only-input admin"
            type="file"
            onChange={imageFileHandler}
            placeholder="첨부 이미지"
            ref={fileInput}
          />
        </div>
        <div className="input-wrap--include-label">
          <label htmlFor="">별 점</label>
          <div className={style['star']}>
            {array.map((item) => {
              return (
                <StarIcon
                  key={item}
                  onClick={() => starPointHandler(item)}
                  className={
                    clicked[item] ? style['star--on'] : style['star--off']
                  }
                />
              );
            })}
          </div>
          <div></div>
          <div
            className={
              noticeStarRate ? style['notice--on'] : style['notice--off']
            }
          >
            <span className={style['notice-text']}>
              별 점으로 평가해주세요.
            </span>
          </div>
        </div>
        <div className="input-wrap--include-label">
          <label htmlFor="">리뷰 내용</label>
          <textarea
            className="input--only-input admin"
            placeholder="리뷰 내용을 작성해주세요."
            onChange={paragraphHandler}
            required
            value={paragraph}
          ></textarea>
        </div>
        <button className="cta-btn--block admin">리뷰 작성</button>
        <div
          className={
            reviewResultController
              ? style['review-result--on']
              : style['review-result--off']
          }
        >
          {reviewResult ? <SuccessIcon /> : <ErrorIcon />}
          <span>
            {reviewResult
              ? '리뷰가 성공적으로 작성되었습니다.'
              : '오류가 발생했습니다.'}
          </span>
        </div>
      </form>
    </div>
  );
};

export default ReviewCreate;
