import React, { useEffect, useState } from 'react';
import styles from './Triangle.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { regenerate, SIDES }  from './TriangleSlice';
import TriangleGenerator from './TriangleGenerator'

import { selectSides } from './TriangleSlice';

const validationCheck = (sides: SIDES) => {
	if (sides[0] >= sides[1] + sides[2] || sides[1] >= sides[0] + sides[2] || sides[2] >= sides[0] + sides[1]) {
		return false;
	}
	return true;
}

export const Triangle = () => {
	const sides = useAppSelector(selectSides);
	const dispatch = useAppDispatch();
	const [sideALength, setSideALength] = useState<number>(0);
	const [sideBLength, setSideBLength] = useState<number>(0);
	const [sideCLength, setSideCLength] = useState<number>(0);
	
	useEffect(() => {
		dispatch(regenerate([sideALength, sideBLength, sideCLength]));
	}, [dispatch, sideALength, sideBLength, sideCLength]);

	return (
		<div>
			<div>Input the length of three sides in any order: </div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Side A"
					value={sideALength}
					type="number"
					min="0"
					onChange={(e) => setSideALength(+e.target.value)}
				/>
				<input
					className={styles.textbox}
					aria-label="Side B"
					value={sideBLength}
					type="number"
					min="0"
					onChange={(e) => setSideBLength(+e.target.value)}
				/>
				<input
					className={styles.textbox}
					aria-label="Side C"
					value={sideCLength}
					type="number"
					min="0"
					onChange={(e) => setSideCLength(+e.target.value)}
				/>
			</div>
			<div>
				{ validationCheck(sides) ? <TriangleGenerator sides={sides}/> : <span>Not a valid triangle</span>}
			</div>
		</div>
	)
}