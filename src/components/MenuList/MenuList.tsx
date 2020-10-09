import { Collapse, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addOrder, setCurrentOrder, setShop } from '../../actions';
import { IOrderState } from '../../store/types';
import Cart from '../Cart';
import MenuDetail from './MenuDetail';
import MenuItem from './MenuItem';
import './MenuList.scss';

const { Panel } = Collapse;

const mapState = (state: IOrderState) => ({
  shopData: state.shop,
  currentOrder: state.currentOrder,
});

const mapDispatch = {
  addOrder,
  setCurrentOrder,
  setShop,
};

const connector = connect(mapState, mapDispatch);

type MenuListProps = ConnectedProps<typeof connector>;

const MenuList: React.FC<MenuListProps> = ({ shopData, setShop, currentOrder, setCurrentOrder, addOrder}) => {
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const handleCancel = (e: React.MouseEvent) => {
    setCurrentOrder(null);
  };

  const handleAdd = (e: React.MouseEvent) => {
    addOrder();
    setCurrentOrder(null);
  };

  useEffect(() => {
    if (shopData)
      setActiveKey(shopData.groupMenus.map(g => g.menuGroupId.toString()));
  }, [shopData]);

  return (
    <div className="MenuList">
      <h2 style={{textAlign: 'center', margin: 0}}>{shopData?.name}</h2>
      <br/>
      <Collapse style={{padding: 0}} activeKey={activeKey} onChange={x => setActiveKey(x as string[])}>
        {shopData?.groupMenus.map(group => (<Panel header={group.name} key={group.menuGroupId.toString()}>
          <List
            size="small"
            dataSource={group.menus}
            renderItem={menu => (
              <List.Item>
                <MenuItem 
                  onClick={() => {setCurrentOrder(menu)}} 
                  menu={menu} 
                  key={menu.menuId}
                />
              </List.Item>
            )}/>
        </Panel>))}
      </Collapse>
      <Modal
        title="메뉴 옵션"
        visible={!!currentOrder}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="담기"
        cancelText="취소"
        destroyOnClose
      >
        <MenuDetail />
      </Modal>

      <Cart />
    </div>
  );
};

export default connector(MenuList);