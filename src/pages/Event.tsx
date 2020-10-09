import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { getEvent, getShopData } from '../lib/api';
import { setEventId, setShop } from '../actions';
import { connect, ConnectedProps } from 'react-redux';
import MenuList from '../components/MenuList';
import { IOrderState } from '../store/types';
import { IEventInfo } from '../types/common';
import { Result } from 'antd';

const mapState = (state: IOrderState) => ({
  shopData: state.shop,
});

const mapDispatch = {
  setEventId,
  setShop,
};

const connector = connect(mapState, mapDispatch);

type EventProps = RouteComponentProps<{eventId: string}> 
  & ConnectedProps<typeof connector>;

const Event: React.FC<EventProps> = ({ shopData, match, setEventId, setShop }) => {
  const eventId = match.params.eventId;
  const [event, setEvent] = useState<IEventInfo | null>(null);

  useEffect(() => {
    setEventId(eventId);
    getEvent(eventId)
      .then(event => {
        setEvent(event);
        return getShopData(event.shop.id);
      })
      .then(shopData => {
        setShop(shopData);
      })
      .catch(e => {
        setShop(null);
        console.error(e);
      });
  }, [eventId, setEventId, setShop]);

  if (shopData === null) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, failed to load the content.`}
      />
    );
  }

  return (
    <>
      <div style={{width: 'fit-content', margin: 'auto'}}>{!!event && event.title}</div>
      {!!event?.closed && <mark>본 주문은 마감되었습니다</mark>}
      <MenuList />
    </>
  );
};

export default connector(Event);
