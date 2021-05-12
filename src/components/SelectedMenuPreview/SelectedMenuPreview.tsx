import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { removeOrder } from 'src/actions';
import { ISelectedMenuSimple } from 'src/store/types';
import './SelectedMenuPreview.scss';

type SelectedMenuPreviewProps = {
  selectedMenu: ISelectedMenuSimple;
  index?: number;
  removeOrder?: typeof removeOrder;
  showFullOption?: boolean
};

const SelectedMenuPreview: React.FC<SelectedMenuPreviewProps> = ({
  selectedMenu, index, removeOrder, showFullOption,
}) => (
    <div className="selected-menu-preview">
      { !!removeOrder && <Button
        type="text" size="small" shape="circle-outline"
        icon={<CloseOutlined />}
        onClick={() => removeOrder && removeOrder(index!)}
      /> }
      <div className="selected-menu-preview-detail">
        <div className="title">
          {!!(selectedMenu.menuDefault.length > 0) && `[${selectedMenu.menuDefault}] `}
          {selectedMenu.menuName} - {selectedMenu.totalPrice} 원
        </div>
        <div className="option" style={{ whiteSpace: showFullOption ? 'normal' : 'nowrap' }}>
          {Object.values(selectedMenu.options).flatMap((x) => x).join(', ')}
        </div>
      </div>
    </div>
);

export default SelectedMenuPreview;
