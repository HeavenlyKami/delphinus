import React, { useEffect } from 'react';
import { fetchBlockHeight }  from './EthSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectEth } from './EthSlice';

export const Eth = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchBlockHeight());
	}, [dispatch]);
	
	const sides = useAppSelector(selectEth);
	console.log(sides)
	return (
		<>
			<div>The height: </div> 
			{sides}
		</>
	)
};

