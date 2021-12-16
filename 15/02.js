import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("15", "input"), "utf8")
	.split("\n")
	.map((line) => line.split("").map(Number));

const getCosts = (arr, xMul, yMul) => {
	const arrWidth = arr[0].length;
	const arrHeight = arr.length;
	const width = arr[0].length * xMul;
	const height = arr.length * yMul;

	const getValue = (x, y) => {
		const mapX = x % arrWidth;
		const mapY = y % arrHeight;
		const value =
			arr[mapY][mapX] + Math.floor(x / arrWidth) + Math.floor(y / arrHeight);

		return value % 9 || 9;
	};
	const getNeigbours = (x, y) => {
		const neighbours = [
			y - 1 >= 0 ? { x, y: y - 1, v: getValue(x, y - 1) } : null,
			x - 1 >= 0 ? { x: x - 1, y, v: getValue(x - 1, y) } : null,
			y + 1 < height ? { x, y: y + 1, v: getValue(x, y + 1) } : null,
			x + 1 < width ? { x: x + 1, y, v: getValue(x + 1, y) } : null,
		].filter(Boolean);
		return neighbours;
	};

	const cost = Array(height)
		.fill(0)
		.map(() => Array(width).fill(Number.MAX_SAFE_INTEGER));

	cost[0][0] = 0;
	let q = [{ x: 0, y: 0, v: 0 }];
	while (q.length) {
		const item = q.shift();
		const curCost = cost[item.y][item.x];
		getNeigbours(item.x, item.y)
			.filter((n) => n.v + curCost < cost[n.y][n.x])
			.forEach((n) => {
				cost[n.y][n.x] = Math.min(cost[n.y][n.x], n.v + curCost);
				q.push(n);
			});
	}
	return cost;
};

const costs = getCosts(input, 5, 5);
console.log(costs[costs.length - 1][costs[0].length - 1]);
