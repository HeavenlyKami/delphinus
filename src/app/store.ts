import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ethReducer from '../features/eth/EthSlice';
import triangleReducer from '../features/triangle/TriangleSlice';

export const store = configureStore({
	reducer: {
		triangle: triangleReducer,
		eth: ethReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootState,
	unknown,
	Action<string>
>;
