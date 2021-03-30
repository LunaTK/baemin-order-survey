import React, { useCallback, useMemo } from 'react'
import { IOrderState } from 'src/store/types';
import { removeOrder, submitOrder } from 'src/actions';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'antd';
import './Cart.scss';
import OrderPreviewCell from './OrderPreviewCell';

const mapState = (state: IOrderState) => ({
  orderList: state.orderList,
});

const mapDispatch = {
  removeOrder,
  submitOrder,
};

const connector = connect(mapState, mapDispatch);

type CartProps = ConnectedProps<typeof connector>;
const Cart: React.FC<CartProps> = ({ orderList, removeOrder, submitOrder }) => {
  const totalPrice = useMemo(() => orderList.reduce((acc, val) => acc + val.totalPrice, 0), [orderList]);
  const onSubmitOrder = useCallback(() => {
    if (orderList.length === 0) {
      alert('주문이 비어있습니다');
    } else {
      const userName = prompt('주문자 이름을 입력해 주세요');
      if (userName) {
        submitOrder(userName);
      } else {
        alert('이름을 입력 해 주세요');
      }
    }
  }, [orderList, submitOrder]);

  return (
    <div className="cart">
      <div className="cart--header">
        <h3>총 금액 : {totalPrice} 원</h3>
        <Button type="primary" size="small" onClick={onSubmitOrder}>주문요청</Button>
      </div>
      {orderList.map((orderSummary, i) => <OrderPreviewCell orderSummary={orderSummary} index={i} removeOrder={removeOrder}/>)}
    </div>
  );
};

export default connector(Cart);