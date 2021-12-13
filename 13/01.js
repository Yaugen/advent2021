import fs from "fs";
import path from "path";

let [points, foldInstructions] = fs
	.readFileSync(path.resolve("13", "input"), "utf8")
	.split("\n\n");
points = points.split("\n").map((line) => line.split(",").map(Number));
foldInstructions = foldInstructions.split("\n").map((line) => {
	const [axis, coord] = line.replace("fold along ", "").split("=");
	return { axis, coord: Number(coord) };
});

const maxX = Math.max(...points.map((pair) => pair[0]));
const maxY = Math.max(...points.map((pair) => pair[1]));

let area = Array(maxY + 1)
	.fill(0)
	.map((_, y) =>
		Array(maxX + 1)
			.fill(0)
			.map((_, x) =>
				points.find((point) => point[0] === x && point[1] === y) ? "#" : "."
			)
	);

const print = (arr) => arr.forEach((line) => console.log(line.join("")));

const foldY = (area, foldLine) => {
	const origHeight = area.length;
	const origWidth = area[0].length;

	const newHeight = Math.max(foldLine, origHeight - foldLine - 1);
	const yOffset = origHeight - foldLine * 2 - 1;

	const newArea = Array(newHeight)
		.fill(".")
		.map(() => Array(origWidth).fill("."));

	const mergeWithNewArea = (sourceArea, offset) => {
		for (let y = 0; y < sourceArea.length; y++) {
			for (let x = 0; x < sourceArea[0].length; x++) {
				if (sourceArea[y][x] === "#") {
					newArea[y + offset][x] = "#";
				}
			}
		}
	};
	const firstPart = area.slice(0, foldLine);
	mergeWithNewArea(firstPart, yOffset >= 0 ? yOffset : 0);
	const secondPart = area.slice(foldLine + 1);
	mergeWithNewArea(secondPart.reverse(), yOffset <= 0 ? -yOffset : 0);

	return newArea;
};
const foldX = (area, foldLine) => {
	const origHeight = area.length;
	const origWidth = area[0].length;

	const newWidth = Math.max(foldLine, origWidth - foldLine - 1);

	const newArea = Array(origHeight)
		.fill(".")
		.map(() => Array(newWidth).fill("."));

	const mergeWithNewArea = (sourceArea, offset) => {
		for (let y = 0; y < sourceArea.length; y++) {
			for (let x = 0; x < sourceArea[0].length; x++) {
				if (sourceArea[y][x] === "#") {
					newArea[y][x] = "#";
				}
			}
		}
	};
	const firstPart = area.map((line) => line.slice(0, foldLine).reverse());
	mergeWithNewArea(firstPart);
	const secondPart = area.map((line) => line.slice(foldLine + 1));
	mergeWithNewArea(secondPart);

	return newArea;
};

const foldInstruction = foldInstructions[0];
const resArea =
	foldInstruction.axis === "x"
		? foldX(area, foldInstruction.coord)
		: foldY(area, foldInstruction.coord);

const res = resArea.reduce(
	(sum, line) =>
		sum +
		line.reduce((lineSum, item) => (item === "#" ? lineSum + 1 : lineSum), 0),
	0
);
console.log(res);
