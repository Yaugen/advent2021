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
				break;
			case "down":
				acc.depth += e.amount;
				break;
			case "up":
				acc.depth -= e.amount;
				break;
		}
		return acc;
	},
	{ pos: 0, depth: 0 }
);

console.log(res.pos * res.depth);
