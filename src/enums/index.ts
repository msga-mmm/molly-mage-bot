/**
 * Up, Down, Left, Right
 */
export enum Direction {
	Up = 'up',
	Down = 'down',
	Left = 'left',
	Right = 'right',
}

export const DIRECTIONS = [
	Direction.Up,
	Direction.Down,
	Direction.Left,
	Direction.Right,
];

/**
 * Act
 */
export enum Action {
	Act = 'act',
}

export enum Command {
	Up = 'up',
	Down = 'down',
	Left = 'left',
	Right = 'right',
	Act = 'act',
	None = 'none',
}

export type Path = Direction[];
