import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { AppRootState } from '../../app/store';

export const fetchBlockHeight = createAsyncThunk(
	'eth/fetchBlockHeight',
	async () => {
		const web3 = new Web3("https://cloudflare-eth.com");
		const response = await web3.eth.getBlockNumber();
		return response
	}
)

export interface EthState {
	ethLoading: boolean,
	blockHeight: number
};

const initialState: EthState = {
	ethLoading: true,
	blockHeight: 0,
};

export const ethSlice = createSlice({
	name: 'eth',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlockHeight.pending, (state) => {
				state.ethLoading = true;
			})
			.addCase(fetchBlockHeight.fulfilled, (state, action) => {
				state.ethLoading = false;
				state.blockHeight = action.payload;
			})
	}
});

export const selectEth = (state: AppRootState) => { 
	return {
		ethLoading: state.eth.ethLoading,
		blockHeight: state.eth.blockHeight
	}
};

export default ethSlice.reducer;

