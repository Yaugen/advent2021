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
		neighbours.push(arr[y - 1][x]);
	}
	if (x !== width - 1) {
		neighbours.push(arr[y][x + 1]);
	}
	if (y !== height - 1) {
		neighbours.push(arr[y + 1][x]);
	}
	if (x !== 0) {
		neighbours.push(arr[y][x - 1]);
	}
	return neighbours;
};

const res = [];
input.forEach((line, y) =>
	line.forEach((item, x) => {
		const neighbours = getNeighbours(x, y, input);
		if (neighbours.every((n) => n > item)) {
			res.push(item);
		}
	})
);

console.log(res.reduce((sum, item) => sum + item + 1, 0));
