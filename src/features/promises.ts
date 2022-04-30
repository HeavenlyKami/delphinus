const sequentialExecute = (tasks: (() => Promise<any>)[]) => {
	let result = Promise.resolve();
	tasks.forEach(task => {
		result = result.then(() => task());
	});
	return result;
};

const testList = Array(10).fill(null).map((_, i) =>
	() => new Promise(resolve => {
		console.log('promise '+ i +' start');
		setTimeout(
			() => {
				console.log('promise ' + i + ' end');
				resolve('output-' + i);
			}, 500
		);
	})
);

export const Q3testCase = sequentialExecute(testList); 

export default sequentialExecute;
