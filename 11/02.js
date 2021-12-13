import fs from "fs";
import path from "path";

let input = fs
	.readFileSync(path.resolve("11", "input"), "utf8")
	.split("\n")
	.map((line) => line.split("").map(Number));

const N = 10;

let step = 0;
let flashes = 0;
const getAdj = (x, y, arr) => {
	const modificators = [
		[0, -1],
		[1, -1],
		[1, 0],
		[1, 1],
		[0, 1],
		[-1, 1],
		[-1, 0],
		[-1, -1],
	];
	const adj = modificators.map(([dx, dy]) => {
		const nx = x + dx;
		const ny = y + dy;
		if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
			return { x: nx, y: ny, v: arr[ny][nx] };
		}
		return null;
	});
	return adj.filter(Boolean);
};
const hash = (item) => `${item.x}_${item.y}`;
const getNextToFlash = (arr) => {
	const nextToFlash = [];
	arr.forEach((line, y) =>
		line.forEach((cell, x) => {
			if (cell > 9) {
				nextToFlash.push({ x, y, v: cell });
			}
		})
	);
	return nextToFlash;
};

while (true) {
	input = input.map((line) => line.map((item) => item + 1));
	let toFlash = getNextToFlash(input);
	let flashed = new Set();
	let stepFlashes = 0;

	while (toFlash.length) {
		toFlash.forEach((item) => {
			flashed.add(hash(item));
			const adj = getAdj(item.x, item.y, input);
			adj.forEach((adjItem) => {
				input[adjItem.y][adjItem.x] += 1;
			});
		});
		toFlash = getNextToFlash(input).filter((item) => !flashed.has(hash(item)));
	}

	input = input.map((line, y) =>
		line.map((cell, x) => {
			if (cell > 9) {
				flashes += 1;
				stepFlashes += 1;
				return 0;
			}
			return cell;
		})
	);

	// console.log(step, flashes);
	// input.forEach((line) => console.log(line.join("")));
	if (stepFlashes === 100) {
		break;
	}
	step += 1;
}

console.log(step + 1);
