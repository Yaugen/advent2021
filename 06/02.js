import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("06", "input"), "utf8")
	.split(",")
	.map(Number);

const N = 256;
let fishCounts = input.reduce((acc, f) => {
	acc[f] += 1;
	return acc;
}, Array(9).fill(0));

const getSum = (counts) => counts.reduce((sum, f) => sum + f, 0);

for (let i = 0; i < N; i++) {
	const born = fishCounts.shift();
	fishCounts[6] += born;
	fishCounts.push(born);
}
console.log(getSum(fishCounts));
