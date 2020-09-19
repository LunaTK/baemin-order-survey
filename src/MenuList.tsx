import React, { useState, useEffect } from 'react';
import { getShopData } from './lib/api';
import { ShopInfo } from './types/common';

import { Collapse, List } from 'antd';
import MenuItem from './MenuItem';

const { Panel } = Collapse;

export default function Menu() {
  const [shopData, setShopInfo] = useState<ShopInfo | null>(null);
  const [activeKey, setActiveKey] = useState<string[]>([]);
  useEffect(() => {
    getShopData(10796716).then(shopData => {
      setShopInfo(shopData);
      setActiveKey(shopData.groupMenus.map(g => g.menuGroupId.toString()));
    });
  }, []);

  return (
    <div>
      <h2 style={{textAlign: 'center', margin: 0}}>{shopData?.name} 메뉴</h2>
      <br/>
      <Collapse style={{padding: 0}} activeKey={activeKey} onChange={x => setActiveKey(x as string[])}>
        {shopData?.groupMenus.map(group => (<Panel header={group.name} key={group.menuGroupId}>
          <List
            size="small"
            dataSource={group.menus}
            renderItem={menu => (
              <List.Item>
                <MenuItem menu={menu} key={menu.menuId}/>
              </List.Item>
            )}/>
        </Panel>))}
      </Collapse>
    </div>
  )
}
