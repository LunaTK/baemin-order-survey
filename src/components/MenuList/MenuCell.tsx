import React from 'react';
import { IMenu, IPrice } from 'src/types/baemin';

const PriceList: React.FC<{
  prices: IPrice[]
}> = ({ prices }) => {
  if (prices.length > 1) {
    return (<ul>
      {prices.map((p) => <li key={p.name}>
        {p.name} : {p.price}
      </li>)}
    </ul>);
  }
  return (<div>
      {prices[0].name}{prices[0].name && ' : '}{prices[0].price}
    </div>);
};

const MenuCell: React.FC<{
  menu: IMenu;
  onClick: () => void | undefined;
}> = ({ menu, onClick }) => (
    <div className="menu-list--cell" onClick={onClick}>
      <div>{menu.name}</div>
      <div className="description">{menu.description}</div>
      <PriceList prices={menu.menuPrices}/>
    </div>
);

export default MenuCell;
