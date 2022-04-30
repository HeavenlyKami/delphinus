const removeZero = (map: Map<number, number>) => {
	const clone = new Map(map);
	for (let pair of clone.entries()) {
		if (pair[1] === 0) {
			clone.delete(pair[0]);
		};
	};
	return clone;
}

class Polynomial {
	// first number represents degree, second number represents coefficient
	terms: Map<number, number>;
	constructor(terms: Map<number, number> | null) {
		this.terms = terms ? removeZero(terms) : new Map<number, number>();
	};

	isEmpty () {
		return this.terms.size === 0 ? true : false;
	}

	getCoeff (degree: number) {
		return this.terms.get(degree) || 0;
	}

	add (other: Polynomial) {
		const newTermSet = new Map<number, number>(this.terms);
		for (let pair of other.terms.entries()) {
			const prevValue = newTermSet.get(pair[0]);
			if (prevValue) {
				newTermSet.set(pair[0], prevValue + pair[1]);
			} else {
				newTermSet.set(pair[0], pair[1]);
			}
		};
		return new Polynomial(newTermSet);
	}

	minus (other: Polynomial) {
		const newTermSet = new Map<number, number>(this.terms);
		for (let pair of other.terms.entries()) {
			const prevValue = newTermSet.get(pair[0]);
			if (prevValue) {
				newTermSet.set(pair[0], prevValue - pair[1]);
			} else {
				newTermSet.set(pair[0], -pair[1]);
			}
		};
		return new Polynomial(newTermSet);
	}

	mul (other: Polynomial) {
		if (this.isEmpty() || other.isEmpty()) {
			return new Polynomial(null);
		}
		const termSet1 = this.terms;
		const termSet2 = other.terms;
		const newTermSet = new Map<number, number>();
		for (let term1 of termSet1.entries()) {
			for (let term2 of termSet2.entries()) {
				const prevValue = newTermSet.get(term1[0] + term2[0]);
				if (prevValue) {
					newTermSet.set(term1[0] + term2[0], prevValue + term1[1] * term2[1]);
				} else {
					newTermSet.set(term1[0] + term2[0], term1[1] * term2[1]);
				}
			}
		}
		return new Polynomial(newTermSet);
	};

	mod (other: Polynomial) {
		if (this.isEmpty()) {
			return new Polynomial(null);
		};
		if (other.isEmpty()) {
			throw new Error('Divisor cannot be zero element');
		};
		const highestDividendDegree = Math.max(...Array.from(this.terms.keys()));
		const highestDivisordDegree = Math.max(...Array.from(other.terms.keys()));
		const highestDivisordDegreeCoeff = other.getCoeff(highestDivisordDegree);
		if (highestDividendDegree < highestDivisordDegree) {
			return new Polynomial(this.terms);
		};
		let remainder = new Polynomial(this.terms);
		for (let i = highestDividendDegree; i >= highestDivisordDegree; i--) {
			if (remainder.getCoeff(i) !== 0) {
				const quotient = new Map<number, number>([[i - highestDivisordDegree, remainder.getCoeff(i) / highestDivisordDegreeCoeff]]);
				remainder = remainder.minus(other.mul(new Polynomial(quotient)));
			};
		};
		return remainder;
	}

	print () {
		const sortedPairs = Array.from(this.terms.entries()).sort((a, b) => b[0] - a[0]);
		const formattedTerms = sortedPairs.map(pair => {
			const deg = pair[0], coeff = pair[1];
			return coeff !== 0 ? `${coeff > 0 ? '+' : '-'}${Math.abs(coeff) !== 1 || deg === 0 ? Math.abs(coeff) : ''}${deg > 0 ? 'x' : ''}${deg > 1 ? '^' + deg : ''}` : '';
		})
		return formattedTerms.reduce((t, s) => t += s, '');
	};
}

export default Polynomial;
