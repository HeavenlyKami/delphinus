import Polynomial from './polynomials';

describe('counter reducer', () => {
	const testMap1 = new Map<number, number>([[4, 1], [2, 3], [1, 2], [0, 1]]);
	const testMap2 = new Map<number, number>([[3, -1], [2, 3], [1, 1], [0, -1]]);
	const testPoly1 = new Polynomial(testMap1); // x^4 + 3*x^2 + 2*x + 1
	const testPoly2 = new Polynomial(testMap2); // -x^3 + 3*x^2 + x - 1
	
	it('should add correctly', () => {
		expect(testPoly1.add(testPoly2).print()).toEqual(
			'+x^4-x^3+6x^2+3x'
		);
	});

	it('should minus correctly', () => {
		expect(testPoly1.minus(testPoly2).print()).toEqual(
			'+x^4+x^3+x+2'
		);
	});

	it('should mul correctly', () => {
		expect(testPoly1.mul(testPoly2).print()).toEqual(
			'-x^7+3x^6-2x^5+6x^4+8x^3+2x^2-x-1'
		);
	});

	it('should mod correctly', () => {
		expect(testPoly1.mod(testPoly2).print()).toEqual(
			'+13x^2+4x-2'
		);
	});

	// edge cases
	it('handle null input', () => {
		expect(new Polynomial(null).print()).toEqual('');
	});
	it('handle zero element', () => {
		expect(new Polynomial(new Map()).print()).toEqual('');
	});
	it('handle zero multiplier', () => {
		expect(new Polynomial(new Map()).mul(testPoly1).print()).toEqual('');
	});
	it('handle zero dividend', () => {
		expect(new Polynomial(new Map()).mod(testPoly1).print()).toEqual('');
	});
});

