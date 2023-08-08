import React, { useState } from 'react';
import style from '../css/Pagination.module.scss';

const Pagination = ({ total, limit, page, setPage }: any) => {
  const numPages = Math.ceil(total / limit);
  return (
    <div className={style.pagination}>
      <nav>
        <button
          className={style.pagination__arrow}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => {
            return (
              <button
                key={i + 1}
                className={page === i + 1 ? style.active_page : ''}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? true : false}
              >
                {i + 1}
              </button>
            );
          })}
        <button
          className={style.pagination__arrow}
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
