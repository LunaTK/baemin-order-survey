import apiReal from './api';
import apiMock from './api-mock';

// TODO: 트리쉐이킹 되게 수정
export default process.env.REACT_APP_USE_MOCK === '1' ? apiMock : apiReal;
