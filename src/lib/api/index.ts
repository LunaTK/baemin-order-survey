import apiReal from './api';
import apiMock from './api-mock';

export default process.env.REACT_APP_USE_MOCK === '1' ? apiMock : apiReal;
