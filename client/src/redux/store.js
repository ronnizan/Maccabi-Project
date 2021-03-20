import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {
  getTotalUsersReducer,
  getUsersReducer,
  registerUserReducer,
} from './reducers/userReducers';
import { popupMessageReducer } from './reducers/popupMessageReducer';
import rootSaga from './sagas';

const reducer = combineReducers({
  popupMessage: popupMessageReducer,
  getUsers: getUsersReducer,
  registerUser: registerUserReducer,
  getTotalUsers: getTotalUsersReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
