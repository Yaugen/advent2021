import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("17", "input"), "utf8");
const [x0, x1, y0, y1] = input
	.replace("target area: x=", "")
	.split(", y=")
	.flatMap((line) => line.split(".."))
	.map(Number);

const target = { x0, x1, y0, y1 };

const getProbeInitial = ({ velX = 0, velY = 0 }) => ({
	x: 0,
	y: 0,
	velX,
	velY,
	maxHeight: Number.MIN_SAFE_INTEGER,
	hit: false,
});

const shoot = (target, velX, velY) => {
	const probe = getProbeInitial({ velX, velY });
	if (velX === 0 && velY === 0) {
		return probe;
	}
	while (probe.x <= target.x1 && probe.y >= target.y0) {
		probe.x += probe.velX;
		probe.y += probe.velY;
		probe.maxHeight = Math.max(probe.maxHeight, probe.y);
		probe.velX += probe.velX === 0 ? 0 : probe.velX > 0 ? -1 : 1;
		probe.velY += -1;
		if (
			probe.x >= target.x0 &&
			probe.x <= target.x1 &&
			probe.y >= target.y0 &&
			probe.y <= target.y1
		) {
			probe.hit = true;
			return probe;
		}
	}
	return probe;
};

const simulate = (target) => {
	let maxHeight = Number.MIN_SAFE_INTEGER;
	let hits = 0;
	for (let velX = 0; velX <= target.x1; velX++) {
		for (let velY = target.y0; velY <= -target.y0; velY++) {
			const probe = shoot(target, velX, velY);
			if (probe.hit) {
				hits += 1;
				maxHeight = Math.max(maxHeight, probe.maxHeight);
			}
		}
	}
	return { maxHeight, hits };
};

console.log(simulate(target));
