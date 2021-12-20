import fs from "fs";
import path from "path";

let [map, area] = fs
	.readFileSync(path.resolve("20", "input"), "utf8")
	.split("\n\n");

map = map.split("").map((item) => (item === "#" ? "1" : "0"));

area = area
	.split("\n")
	.map((line) => line.split("").map((item) => (item === "#" ? "1" : "0")));

const mask = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[0, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
];

let width = area[0].length;
let height = area.length;

const print = () =>
	console.log(
		area
			.map((line) => line.map((item) => (item === "1" ? "#" : ".")).join(""))
			.join("\n")
	);

const addLines = (n = 3, curDefault) => {
	for (let i = 0; i < n; i++) {
		area.push(Array(width).fill(curDefault));
		area.unshift(Array(width).fill(curDefault));
	}
	height += n * 2;
	area = area.map((line) => [
		...Array(n).fill(curDefault),
		...line,
		...Array(n).fill(curDefault),
	]);
	width += n * 2;
};

const step = (curDefault) => {
	addLines(1, curDefault);
	const newArea = Array(height)
		.fill("")
		.map(() => Array(width).fill(""));
	const get = (x, y) => {
		return x >= 0 && x < width && y >= 0 && y < height
			? area[y][x]
			: curDefault;
	};

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const indexBits = mask.map(([dx, dy]) => get(x + dx, y + dy)).join("");
			const index = parseInt(indexBits, 2);

			newArea[y][x] = map[index];
		}
	}
	area = newArea;
};

let curDefault = "0";
for (let i = 0; i < 50; i++) {
	step(curDefault);
	curDefault = curDefault === "1" ? map[511] : map[0];
}

const count = area.reduce(
	(acc, line) =>
		acc + line.reduce((lineAcc, item) => lineAcc + Number(item), 0),
	0
);
console.log(map[0], map[511]);
console.log(count);
