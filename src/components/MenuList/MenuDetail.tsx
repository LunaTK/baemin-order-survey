import { Divider, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateMenuDefault } from 'src/actions';
import { ICurrentMenu, IOrderState } from 'src/store/types';
import MenuOptionGroup from './MenuOptionGroup';

const mapState = (state: IOrderState) => ({
  currentMenu: state.currentMenu,
  totalPrice: state.currentMenu?.totalPrice,
});

const mapDispatch = {
  updateMenuDefault: (e: RadioChangeEvent) => updateMenuDefault(e.target.value),
};

const connector = connect(mapState, mapDispatch);

type MenuDetailProps = ConnectedProps<typeof connector> & {
  currentMenu: ICurrentMenu | null;
};

const MenuDetail: React.FC<MenuDetailProps> = ({ currentMenu, updateMenuDefault, totalPrice }) => {
  if (!currentMenu) return null;
  const { menu, options } = currentMenu;
  const { images } = menu;

  return (
    <div className="menu-detail">
      {!!images.length && <img className="thumbnail" alt="food" src={images[0].url} height="160"/>}
      <div className="soft-box">
        <span className="title">{menu.name}</span>
        <span className="description">{menu.description}</span>
      </div>

      <h3>기본</h3>
      <Radio.Group defaultValue={menu.menuPrices[0].name} onChange={updateMenuDefault}>
        {menu.menuPrices.map((mp) => <Radio key={mp.name} value={mp.name}>{mp.name} ({mp.price})</Radio>)}
      </Radio.Group>

      <br/>

      {menu.optionGroups.map((og) => (
        <>
          <br/>
          <MenuOptionGroup optionGroup={og} selected={options[og.optionGroupId].selected}/>
        </>
      ))}

      <Divider />

      <h3>총 가격 : {totalPrice}원</h3>
    </div>
  );
};

export default connector(MenuDetail);
