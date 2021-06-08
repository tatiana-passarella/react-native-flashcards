import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';

export default applyMiddleware(thunk, logger);