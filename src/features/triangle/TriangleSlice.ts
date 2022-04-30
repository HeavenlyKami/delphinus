import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from '../../app/store';

export type SIDES = [number, number, number];

export interface TriangleState {
	sides: SIDES;
};

const initial: TriangleState = {
	sides: [0, 0, 0],
};

export const triangleSlice = createSlice({
	name: 'triangle',
	initialState: initial,
	reducers: {
		regenerate: (state, action: PayloadAction<SIDES>) => {
			state.sides = action.payload;
		}
	},
});

export const { regenerate } = triangleSlice.actions;

export const selectSides = (state: AppRootState) => { return state.triangle.sides };

export default triangleSlice.reducer;
