import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("19", "input"), "utf8").split("\n");
class Signal {
	relatives = [];
	constructor(x, y, z, id) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.id = id;
	}

	align(signal) {
		const dx = Math.abs(this.x - signal.x);
		const dy = Math.abs(this.y - signal.y);
		const dz = Math.abs(this.z - signal.z);
		this.relatives[signal.id] = signal.relatives[this.id] = [
			Math.hypot(dx, dy, dz).toFixed(5),
			Math.min(dx, dy, dz),
			Math.max(dx, dy, dz),
		].join(",");
	}

	compare(signal) {
		const result = [];
		for (let relative of this.relatives) {
			const index = signal.relatives.indexOf(relative);
			if (index > -1)
				result.push([
					signal.relatives[index],
					this.relatives.indexOf(relative),
					index,
				]);
		}
		return result;
	}
}

class Scanner {
	signals = [];

	addSignal(x, y, z) {
		const newSignal = new Signal(x, y, z, this.signals.length);
		for (let signal of this.signals) {
			signal.align(newSignal);
		}
		this.signals.push(newSignal);
	}

	compare(scanner) {
		for (let there of scanner.signals) {
			for (let here of this.signals) {
				const intersection = there.compare(here);
				if (intersection.length >= 11) {
					return { there, here, intersection };
				}
			}
		}
	}

	align(scanner, data) {
		for (let line of data.intersection) {
			if (line[0].split(",")[1] === "0") continue;
			const relativeHere = this.signals[line[2]];
			const dx0 = data.here.x - relativeHere.x;
			const dy0 = data.here.y - relativeHere.y;
			const dz0 = data.here.z - relativeHere.z;

			const relativeThere = scanner.signals[line[1]];
			const dx1 = data.there.x - relativeThere.x;
			const dy1 = data.there.y - relativeThere.y;
			const dz1 = data.there.z - relativeThere.z;
			if (
				Math.abs(dx0) === Math.abs(dy0) ||
				Math.abs(dz0) === Math.abs(dy0) ||
				Math.abs(dx0) === Math.abs(dz0)
			) {
				continue;
			}

			const map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

			if (dx0 === dx1) map[0] = 1;
			if (dx0 === -dx1) map[0] = -1;
			if (dx0 === dy1) map[3] = 1;
			if (dx0 === -dy1) map[3] = -1;
			if (dx0 === dz1) map[6] = 1;
			if (dx0 === -dz1) map[6] = -1;
			if (dy0 === dx1) map[1] = 1;
			if (dy0 === -dx1) map[1] = -1;
			if (dy0 === dy1) map[4] = 1;
			if (dy0 === -dy1) map[4] = -1;
			if (dy0 === dz1) map[7] = 1;
			if (dy0 === -dz1) map[7] = -1;
			if (dz0 === dx1) map[2] = 1;
			if (dz0 === -dx1) map[2] = -1;
			if (dz0 === dy1) map[5] = 1;
			if (dz0 === -dy1) map[5] = -1;
			if (dz0 === dz1) map[8] = 1;
			if (dz0 === -dz1) map[8] = -1;

			for (let signal of scanner.signals) {
				const old = {
					x: signal.x,
					y: signal.y,
					z: signal.z,
				};
				signal.x = old.x * map[0] + old.y * map[3] + old.z * map[6];
				signal.y = old.x * map[1] + old.y * map[4] + old.z * map[7];
				signal.z = old.x * map[2] + old.y * map[5] + old.z * map[8];
			}
			scanner.position = {
				x: data.here.x - data.there.x,
				y: data.here.y - data.there.y,
				z: data.here.z - data.there.z,
			};
			for (let signal of scanner.signals) {
				signal.x += scanner.position.x;
				signal.y += scanner.position.y;
				signal.z += scanner.position.z;
			}
			break;
		}
	}
}

class Solver {
	scanners = [];
	constructor(data) {
		let scanner;
		for (let input of data) {
			if (input.length === 0) continue;
			if (input[1] === "-") {
				scanner = new Scanner();
				this.scanners.push(scanner);
				continue;
			}
			scanner.addSignal(...input.split(",").map(Number));
		}
	}

	align() {
		const locked = new Set([0]);
		this.scanners[0].position = { x: 0, y: 0, z: 0 };
		while (locked.size < this.scanners.length) {
			for (let i = 0; i < this.scanners.length; i++) {
				for (let j = 0; j < this.scanners.length; j++) {
					if (i === j || !locked.has(i) || locked.has(j)) continue;
					let intersection = this.scanners[i].compare(this.scanners[j]);
					if (!intersection) continue;
					this.scanners[i].align(this.scanners[j], intersection);
					locked.add(j);
				}
			}
		}
	}
	get result() {
		this.align();
		const beacons = new Set();
		for (let scanner of this.scanners)
			for (let signal of scanner.signals)
				beacons.add([signal.x, signal.y, signal.z].join(","));

		return beacons.size;
	}
}

const solver = new Solver(input);
console.log(solver.result);
