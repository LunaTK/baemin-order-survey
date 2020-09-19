import React from 'react'
import { Menu, Price } from './types/common';
import './MenuItem.css';

function PriceList(props: {
  prices: Price[];
}) {
  const { prices } = props;
  if (prices.length > 1) {
    return (<ul>
      {prices.map(p => <li>
        {p.name} : {p.price}
      </li>)}
    </ul>);
  } else {
    return (<div>
      {prices[0].name}{prices[0].name && ' : '}{prices[0].price}
    </div>)
  }
}

function MenuItem(props: {
  menu: Menu
}) {
  const { menu } = props;
  return (
    <div className="menu-item">
      <div>{menu.name}</div>
      <div className="description">{menu.description}</div>
      <PriceList prices={menu.menuPrices}/>
    </div>
  )
}

export default MenuItem
