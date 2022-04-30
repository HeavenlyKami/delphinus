import React, {
	useEffect, useRef
} from "react";
import { TriangleState } from './TriangleSlice';

const CanvasWidth = 400;

const TriangleGenerator = (props: TriangleState) => {
	const { sides } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const sortedSides = [...sides].sort((a, b) => b - a);
	const [ a, b, c ] = sortedSides;
	const cosine = (a * a + b * b - c * c) / 2 / a / b;
	const ScaledSide = CanvasWidth * b / a;
	const offsetX = ScaledSide * cosine;
	const offsetY = Math.sqrt(ScaledSide * ScaledSide - offsetX * offsetX)

	useEffect(() => {
		const draw = (ctx: CanvasRenderingContext2D) => {
			ctx.beginPath();
			ctx.moveTo(0, offsetY);
			ctx.lineTo(CanvasWidth, offsetY);
			ctx.lineTo(offsetX, 0);
			ctx.lineTo(0, offsetY);
			ctx.stroke();
			ctx.closePath();

			ctx.font = "20px sans";
			ctx.fillText(a.toString(), CanvasWidth/2, offsetY);
			ctx.fillText(b.toString(), offsetX/2, offsetY/2);
			ctx.fillText(c.toString(), offsetX/2 + CanvasWidth/2 - 10, offsetY/2);
		};
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			if (context) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				draw(context);
			};
		};
	}, [a, b, c, offsetX, offsetY]);

	return (
		<div>
			<canvas ref={canvasRef} {...props} width={CanvasWidth + 20} height={offsetY + 50} />
		</div>
	);
};

export default TriangleGenerator;