import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { setEvent } from 'src/slice/new-order-slice';
import MenuList from 'src/components/MenuList';
import { IOrderState } from 'src/store/types';
import { Button, Result } from 'antd';

const mapState = (state: IOrderState) => ({
  eventInfo: state.event,
  shopInfo: state.shop,
});

const mapDispatch = {
  setEvent,
};

const connector = connect(mapState, mapDispatch);

type EventProps = RouteComponentProps<{eventId: string}>
  & ConnectedProps<typeof connector>;

const Event: React.FC<EventProps> = ({
  eventInfo, shopInfo, match, setEvent,
}) => {
  const { eventId } = match.params;

  useEffect(() => {
    setEvent(eventId);
  }, [eventId, setEvent]);

  if (!eventInfo.loading && !shopInfo.loading && shopInfo === null) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={'Sorry, failed to load the content.'}
      />
    );
  }

  return (
    <>
      <div style={{ width: 'fit-content', margin: 'auto' }}>
        {!eventInfo.loading && eventInfo.data?.title}
        <Button size="small" type="link">
          <Link to={`./${eventId}/summary`}>접수 현황</Link>
        </Button> <br/>
      </div>
      {/* {!!event?.closed && <mark>본 주문은 마감되었습니다</mark>} */}
      <MenuList />
    </>
  );
};

export default connector(Event);
