import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("09", "input"), "utf8")
	.split("\n")
	.map((line) => line.split("").map(Number));

const getNeighbours = (x, y, arr) => {
	const width = arr[0].length;
	const height = arr.length;

	const neighbours = [];
	if (y !== 0) {
		neighbours.push({ x, y: y - 1, v: arr[y - 1][x] });
	}
	if (x !== width - 1) {
		neighbours.push({ x: x + 1, y, v: arr[y][x + 1] });
	}
	if (y !== height - 1) {
		neighbours.push({ x, y: y + 1, v: arr[y + 1][x] });
	}
	if (x !== 0) {
		neighbours.push({ x: x - 1, y, v: arr[y][x - 1] });
	}
	return neighbours;
};

const lowestPoints = [];
input.forEach((line, y) =>
	line.forEach((item, x) => {
		const neighbours = getNeighbours(x, y, input);
		if (neighbours.every((n) => n.v > item)) {
			lowestPoints.push({ x, y, v: item });
		}
	})
);

const hash = (point) => `${point.x}_${point.y}`;
const basins = lowestPoints.map((point) => {
	const basinPoints = new Map();
	let toTrack = [point];
	while (toTrack.length) {
		toTrack = toTrack.reduce((acc, pointToTrack) => {
			basinPoints.set(hash(pointToTrack), pointToTrack);
			const neighbours = getNeighbours(
				pointToTrack.x,
				pointToTrack.y,
				input
			).filter((n) => n.v !== 9 && !basinPoints.has(hash(n)));
			return acc.concat(neighbours);
		}, []);
	}
	return [...basinPoints.values()];
});

console.log(
	basins
		.map((basin) => basin.length)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((mul, item) => mul * item, 1)
);
