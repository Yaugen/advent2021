import fs from "fs";

const input = fs
	.readFileSync("input", "utf8")
	.split("\n")
	.map((e) => {
		const [dir, amount] = e.split(" ");
		return { dir, amount: Number(amount) };
	});
const res = input.reduce(
	(acc, e) => {
		switch (e.dir) {
			case "forward":
				acc.pos += e.amount;
				acc.depth += e.amount * acc.aim;
				break;
			case "down":
				acc.aim += e.amount;
				break;
			case "up":
				acc.aim -= e.amount;
				break;
		}
		return acc;
	},
	{ pos: 0, depth: 0, aim: 0 }
);

console.log(res.pos * res.depth);
