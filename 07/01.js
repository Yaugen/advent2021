import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("07", "test_input"), "utf8")
	.split(",")
	.map(Number);
const max = Math.max(...input);
const min = Math.min(...input);

const getFuelCount = (threshold) => {
	return input.reduce((sum, e) => sum + Math.abs(e - threshold), 0);
};
let minFuel = [undefined, Number.MAX_SAFE_INTEGER];
for (let i = min; i <= max; i++) {
	const fuel = getFuelCount(i);
	if (fuel < minFuel[1]) {
		minFuel = [i, fuel];
	}
}
console.log(minFuel);
