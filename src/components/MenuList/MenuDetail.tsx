import { Divider, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateMenuDefault } from '../../actions';
import { IOrder, IOrderState } from '../../store/types';
import MenuOptionGroup from './MenuOptionGroup';

const mapState = (state: IOrderState) => ({
  order: state.currentOrder,
  totalPrice: state.currentOrder?.totalPrice,
});

const mapDispatch = {
  updateMenuDefault: (e: RadioChangeEvent) => updateMenuDefault(e.target.value),
};

const connector = connect(mapState, mapDispatch);

type MenuDetailProps = ConnectedProps<typeof connector> & {
  order: IOrder | null;
};

const MenuDetail: React.FC<MenuDetailProps> = ({order, updateMenuDefault, totalPrice}) => {
  if (!order) return <></>;
  const menu = order.menu;
  const images = menu.images;

  return (
    <div className="MenuDetail">
      {!!images.length && <img className="thumbnail" alt="food" src={images[0].url} height="160"/>}
      <div className="soft-box">
        <span className="title">{menu.name}</span>
        <span className="description">{menu.description}</span>
      </div>

      <h3>기본</h3>
      <Radio.Group defaultValue={menu.menuPrices[0].name} onChange={updateMenuDefault}>
        {menu.menuPrices.map(mp => <Radio value={mp.name}>{mp.name} ({mp.price})</Radio>)}
      </Radio.Group>

      <br/>

      {menu.optionGroups.map(og => <><br/><MenuOptionGroup optionGroup={og} /></>)}

      <Divider />

      <h3>총 가격 : {totalPrice}원</h3>
    </div>
  );
};

export default connector(MenuDetail);;