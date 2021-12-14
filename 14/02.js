import fs from "fs";
import path from "path";

export class List {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}

	push(value) {
		const newNode = new ListNode(value);
		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length += 1;
	}

	values() {
		const values = [];
		let cur = this.head;
		while (cur) {
			values.push(cur.value);
			cur = cur.next;
		}

		return values;
	}

	print() {
		console.log(this.values().join(","));
	}
}

export class ListNode {
	constructor(value) {
		this.next = null;
		this.value = value;
	}
}

let [template, map] = fs
	.readFileSync(path.resolve("14", "input"), "utf8")
	.split("\n\n");
map = map.split("\n").reduce((acc, item) => {
	const [key, value] = item.split(" -> ");
	return { ...acc, [key]: value };
}, {});
const addValue = (obj, key, value) => {
	if (!obj[key]) {
		obj[key] = value;
	} else {
		obj[key] += value;
	}
};
let pairs = template.split("").reduce((acc, item, index, arr) => {
	if (index === arr.length - 1) {
		return acc;
	}
	const pair = item + arr[index + 1];
	addValue(acc, pair, 1);
	return acc;
}, {});
let charCounts = template.split("").reduce((acc, item) => {
	addValue(acc, item, 1);
	return acc;
}, {});

let N = 0;
while (N < 40) {
	const newPairs = {};
	Object.entries(pairs).forEach(([pair, count]) => {
		const [a, b] = pair.split("");
		const newChar = map[pair];
		addValue(newPairs, a + newChar, count);
		addValue(newPairs, newChar + b, count);
		addValue(charCounts, newChar, count);
	});
	pairs = newPairs;
	N += 1;
}

const min = Math.min(...Object.values(charCounts));
const max = Math.max(...Object.values(charCounts));

console.log(max - min);
