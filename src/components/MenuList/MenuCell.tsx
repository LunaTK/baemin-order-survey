import React from 'react';
import { IMenu, IPrice } from 'src/types/baemin';

const PriceList: React.FC<{
  prices: IPrice[];
}> = ({ prices }) => {
  if (prices.length > 1) {
    return (
      <ul>
        {prices.map((p) => (
          <li key={p.name}>
            {p.name} : {p.price}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      {prices[0].name}
      {prices[0].name && ' : '}
      {prices[0].price}
    </div>
  );
};

const MenuCell: React.FC<{
  menu: IMenu;
  onClick: () => void | undefined;
}> = ({ menu, onClick }) => {
  // TODO: 썸네일 최적화 이미지 선정 로직 추가
  const thumbnail = menu.images.length ? menu.images[0] : null;

  return (
    <div className="menu-list--cell" onClick={onClick}>
      {thumbnail && <img width="80" height="80" src={thumbnail.url} className="thumbnail" alt="thumbnail" />}
      <div className="name">{menu.name}</div>
      <div className="description">{menu.description}</div>
      <PriceList prices={menu.menuPrices} />
    </div>
  );
};

export default MenuCell;
