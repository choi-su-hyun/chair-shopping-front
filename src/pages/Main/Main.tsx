import React, { useContext } from 'react';
import { Context } from '../../context/context';
import { counterProps } from '../../App';
import style from './Main.module.scss';
import { Link } from 'react-router-dom';
import ProductList from '../../components/posts/ProductList';
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';

type example = (num: number) => void;

function Main({ increase }: { increase: (num: number) => void }) {
  const user = useContext(Context);
  const plusHandler = (e: React.MouseEvent) => {
    increase(1);
    // console.log(props);
  };
  return (
    <div>
      <section className={style.banner}>
        <div className="container">
          <h1 className={style.banner__title}>
            앉아 있는 순간이
            <br />
            편안한 시간이 될 수 있게, <br />
            Relaxing Time
          </h1>
          <p className={style.banner__paragraph}>
            RELAXING TIME이 당신의 하루를 <br />
            편안하게 해드릴게요.
          </p>
        </div>
      </section>
      <section className={style.product_list_section}>
        <div className="container">
          <div className={style.container__side_layout}>
            <div className={style['title-wrap']}>
              <h2 className="page-content__title main-page">
                요즘 많이 찾는 의자(테스트)
              </h2>
              <span>Favorite Product</span>
            </div>
            <Link to={'/product'} className="general-btn--right-pictogram">
              더보기
              <ChevronRight />
            </Link>
          </div>
          <ProductList />
        </div>
      </section>
      <section>
        <div className="container">
          <Link to={'/'} className={style.banner_sub}>
            <div>
              <h3 className={style.banner_sub__title}>
                용도에 맞는 다양한 의자를 경험해보세요.
              </h3>
              <p className={style.banner_sub__paragraph}>
                RELAXING TIME이 당신의 하루를 편하게 해드릴게요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Main;
