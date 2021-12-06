import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("06", "input"), "utf8")
	.split(",")
	.map(Number);
let fishes = input.slice();

const N = 80;

for (let i = 0; i < N; i++) {
	let newFishes = 0;
	fishes = fishes.map((f) => {
		if (f === 0) {
			newFishes += 1;
			return 6;
		}
		return f - 1;
	});

	for (let j = 0; j < newFishes; j++) {
		fishes.push(8);
	}
}
console.log(fishes.length);
