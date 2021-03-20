import { Button } from 'antd';
import React from 'react';
import { removeOrder } from 'src/actions';
import { IOrderSummary } from 'src/store/types';
import { CloseOutlined } from '@ant-design/icons';

type OrderPreviewProps = {
  orderSummary: IOrderSummary;
  index?: number;
  removeOrder?: typeof removeOrder;
  showFullOption?: boolean
};

const OrderPreview: React.FC<OrderPreviewProps> = ({orderSummary, index, removeOrder, showFullOption}) => {
  return (
    <div className="order-preview">
      { !!removeOrder && <Button 
        type="text" size="small" shape="circle-outline" 
        icon={<CloseOutlined />} 
        onClick={() => removeOrder && removeOrder(index!)}
      /> }
      <div className="order-detail">
        <div className="title">
          {!!(orderSummary.menuDefault.length > 0) && `[${orderSummary.menuDefault}] `}
          {orderSummary.menuName} - {orderSummary.totalPrice} 원
        </div>
        <div className="option" style={{whiteSpace: showFullOption ? 'normal' : 'nowrap'}}>
          {Object.values(orderSummary.options).flatMap(x => x).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;