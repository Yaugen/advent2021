import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("05", "test_input"), "utf8");
const lines = input
	.split("\n")
	.map((line) => line.split(" -> ").map((pair) => pair.split(",").map(Number)));

const markPoints = (points, [[x1, y1], [x2, y2]]) => {
	const length = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 1;
	const xArr = Array(length)
		.fill(x1)
		.map((e, i) => e + Math.sign(x2 - x1) * i);
	const yArr = Array(length)
		.fill(y1)
		.map((e, i) => e + Math.sign(y2 - y1) * i);

	for (let i = 0; i < length; i++) {
		const key = `${xArr[i]}_${yArr[i]}`;
		points.set(key, (points.get(key) || 0) + 1);
	}
	return points;
};

const points = lines
	.filter(
		([[x1, y1], [x2, y2]]) =>
			x1 === x2 || y1 === y2 || Math.abs(x1 - x2) === Math.abs(y1 - y2)
	)
	.reduce(markPoints, new Map());

const res = [...points.values()].filter((v) => v > 1).length;

console.log(res);
