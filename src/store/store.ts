import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import feedReducer from '../features/feed/feedSlice';
import connectionReducer from '../features/connections/connectionSlice';
import requestReducer from '../features/requests/requestSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
