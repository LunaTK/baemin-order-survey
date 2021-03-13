import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { getEvent } from '../lib/api';
import { OrderPreview } from '../components/Cart';
import { IEventInfo } from '../types/common';
import { Table } from 'antd';
import { IOrderSummary } from '../store/types';

const columns = [
  {
    title: '이름',
    dataIndex: 'userName',
    key: 'userName'
  },
  {
    title: '주문',
    dataIndex: 'order',
    key: 'order',
    render: (order: IOrderSummary[]) => (
      <>
        {order.map(os => <OrderPreview orderSummary={os} showFullOption />)}
      </>
    ),
    sorter: (o1: any, o2: any) => {
      return o1.order[0].menuName < o2.order[0].menuName ? -1 : 1;
    }
  },
  {
    title: '금액',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  }
];

type EventSummaryProps = RouteComponentProps<{eventId: string}>;

const EventSummary: React.FC<EventSummaryProps> = ({match}) => {
  const eventId = match.params.eventId;
  const [event, setEvent] = useState<IEventInfo | null>(null);

  useEffect(() => {
    getEvent(eventId).then(setEvent);
  }, [eventId]);
  return (
    <>
      <h1>{event?.title} 주문요약{/*event?.closed === true && <mark> - 마감</mark>*/}</h1>
      <h2>총 주문 : {event?.orders.length}</h2>
      <br/><br/>
      {!!event && <Table dataSource={event.orders} columns={columns} pagination={{ pageSize: 20 }}/>}
    </>
  );
};

export default EventSummary;