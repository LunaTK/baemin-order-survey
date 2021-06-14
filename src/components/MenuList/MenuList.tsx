import { Collapse, List, Modal } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addCartItem, setCurrentMenu, setMenuListActiveKeys } from 'src/actions';
import { IOrderState } from 'src/store/types';
import Cart from 'src/components/Cart';
import MenuDetail from './MenuDetail';
import MenuCell from './MenuCell';
import './MenuList.scss';

const { Panel } = Collapse;

const mapState = (state: IOrderState) => ({
  shopInfo: state.shop.data,
  currentMenu: state.currentMenu,
  menuListActiveKeys: state.menuListActiveKeys,
});

const mapDispatch = {
  addCartItem,
  setCurrentMenu,
  setMenuListActiveKeys,
};

const connector = connect(mapState, mapDispatch);

export type MenuListProps = ConnectedProps<typeof connector>;

export const PureMenuList: React.FC<MenuListProps> = ({
  menuListActiveKeys, setMenuListActiveKeys, shopInfo, currentMenu, setCurrentMenu, addCartItem, 
}) => {
  const shopData = shopInfo;

  const handleCancel = useCallback((e: React.MouseEvent) => {
    setCurrentMenu(null);
  }, [setCurrentMenu]);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    addCartItem();
    setCurrentMenu(null);
  }, [addCartItem, setCurrentMenu]);

  useEffect(() => {
    if (shopData) {
      setMenuListActiveKeys(shopData.groupMenus.map((g) => g.menuGroupId.toString()));
    } else {
      setMenuListActiveKeys([]);
    }
  }, [shopData]);

  return (
    <div className="menu-list">
      <h2 style={{ textAlign: 'center', margin: 0 }}>{shopData?.name}</h2>
      <br/>
      <Collapse style={{ padding: 0 }} activeKey={menuListActiveKeys} onChange={(x) => setMenuListActiveKeys(x as string[])}>
        {shopData?.groupMenus.map((group) => (<Panel header={group.name} key={group.menuGroupId.toString()}>
          <List
            size="small"
            dataSource={group.menus}
            renderItem={(menu) => (
              <List.Item>
                <MenuCell
                  onClick={() => { setCurrentMenu(menu); }}
                  menu={menu}
                  key={menu.menuId}
                />
              </List.Item>
            )}/>
        </Panel>))}
      </Collapse>
      <Modal
        title="메뉴 옵션"
        visible={!!currentMenu}
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

export default connector(PureMenuList);
