import type { Difficulty } from "./difficulty";

export type InvaderName =
	"Kingdom of Brandenburg-Prussia" |
	"Kingdom of England" |
	"Kingdom of Sweden";

export interface IInvader {
	name: InvaderName,
	levels: {
		level: 0 | 1 | 2 | 3 | 4 | 5 | 6,
		difficulty: Difficulty,
	}[],
}

export const INVADERS: IInvader[] = [
	{
		name: "Kingdom of Brandenburg-Prussia",
		levels: [
			{ level: 0, difficulty: 1 },
			{ level: 1, difficulty: 2 },
			{ level: 2, difficulty: 4 },
			{ level: 3, difficulty: 6 },
			{ level: 4, difficulty: 7 },
			{ level: 5, difficulty: 9 },
			{ level: 6, difficulty: 10 },
		]
	},
	{
		name: "Kingdom of England",
		levels: [
			{ level: 0, difficulty: 1 },
			{ level: 1, difficulty: 3 },
			{ level: 2, difficulty: 4 },
			{ level: 3, difficulty: 6 },
			{ level: 4, difficulty: 7 },
			{ level: 5, difficulty: 9 },
			{ level: 6, difficulty: 10 },
		]
	},
	{
		name: "Kingdom of Sweden",
		levels: [
			{ level: 0, difficulty: 1 },
			{ level: 1, difficulty: 2 },
			{ level: 2, difficulty: 3 },
			{ level: 3, difficulty: 5 },
			{ level: 4, difficulty: 6 },
			{ level: 5, difficulty: 7 },
			{ level: 6, difficulty: 8 },
		]
	},
];