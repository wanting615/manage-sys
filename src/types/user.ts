export interface UserInfo {
	id: number;
	userId: number;
	username: string;
	password: string;
	name: string;
	createAt: string;
	status: number;
	level: UserLevel;
	phone?: string;
}

export enum UserLevel {
	admin = 1,
	nomal = 2,
}

export type UserKey = keyof UserInfo;

export type UserSearchOption = {
	[key in string]: Array<string | number>;
};
