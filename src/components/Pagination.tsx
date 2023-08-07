import React from 'react';

const Pagination = ({ total, limit, page, setPage }: any) => {
  const numPages = Math.ceil(total / limit);

  return (
    <div>
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => {
            return (
              <button key={i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            );
          })}
        <button onClick={() => setPage(page - 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
