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

const list = new List();
template.split("").forEach((item) => list.push(item));

const step = () => {
	let cur = list.head;
	while (cur) {
		const curValue = cur.value;
		const nextValue = cur.next?.value;
		const nextCur = cur.next;
		if (curValue && nextValue) {
			const pair = curValue + nextValue;
			const valueToPut = map[pair];
			const newNode = new ListNode(valueToPut);
			newNode.next = cur.next;
			cur.next = newNode;
		}
		cur = nextCur;
	}
};

let N = 0;
while (N < 10) {
	step();
	N += 1;
}

const listValueCounts = Object.values(
	list.values().reduce((acc, item) => {
		if (!acc[item]) {
			acc[item] = 0;
		}
		acc[item] += 1;
		return acc;
	}, {})
);
const min = Math.min(...listValueCounts);
const max = Math.max(...listValueCounts);
console.log(max - min);
