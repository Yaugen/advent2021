import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("15", "input"), "utf8")
	.split("\n")
	.map((line) => line.split("").map(Number));

const getCosts = (arr) => {
	const visited = new Set();
	const hash = (x, y) => `${x}_${y}`;
	const getNeigbours = (x, y) => {
		const neighbours = [
			y - 1 >= 0 ? { x, y: y - 1, v: arr[y - 1][x] } : null,
			x + 1 < arr[0].length ? { x: x + 1, y, v: arr[y][x + 1] } : null,
			y + 1 < arr.length ? { x, y: y + 1, v: arr[y + 1][x] } : null,
			x - 1 >= 0 ? { x: x - 1, y, v: arr[y][x - 1] } : null,
		].filter(Boolean);
		return neighbours;
	};

	const cost = Array(input.length)
		.fill(0)
		.map(() => Array(input[0].length).fill(Number.MAX_SAFE_INTEGER));

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

const costs = getCosts(input);
console.log(costs[costs.length - 1][costs[0].length - 1]);
