import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEventList } from '../lib/api';

const EventList = () => {
  const [eventList, setEventList] = useState<any>([]);

  useEffect(() => {
    getEventList().then(setEventList);
  }, [])

  return (
    <List
      header={<div>이벤트 목록</div>}
      bordered
      dataSource={eventList}
      renderItem={(item: any) => <List.Item><Link to={`/event/${item.id}`}>{item.data().title}</Link></List.Item>}
    />
  );
};

export default EventList;
