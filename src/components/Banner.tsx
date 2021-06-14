import React from 'react';

const Banner = () => (
  <div
    style={{
      textAlign: 'center',
      color: 'yellow',
      backgroundColor: 'gray',
      position: 'fixed',
      width: '100%',
      zIndex: 1,
    }}
  >
    현재 보시는 페이지는 데모용 사이트로, Mocking된 데이터가 표시됩니다
  </div>
);

export default Banner;
