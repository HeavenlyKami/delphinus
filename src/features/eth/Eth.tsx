import React, { useEffect } from 'react';
import { fetchBlockHeight }  from './EthSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectEth } from './EthSlice';

export const Eth = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(fetchBlockHeight());
	}, [dispatch]);

	const { ethLoading, blockHeight } = useAppSelector(selectEth);
	return (
		<>
			<div>The blockHeight of ethereum: </div> 
			{ethLoading ? 'Loading...' : blockHeight}
			<button onClick={() => dispatch(fetchBlockHeight())}>Fetch Again</button>
		</>
	)
};

