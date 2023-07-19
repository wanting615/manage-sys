import { MutationTree, Module, Store as VuexStore, CommitOptions } from "vuex";
import { State as RootState } from "./../index";
import { UserInfo } from "@/types/user";

export type State = {
	token: string;
	isLogin: boolean;
	userInfo: UserInfo | null;
};

const state: State = {
	token: "",
	isLogin: false,
	userInfo: null,
};

export type Mutations = {
	setIslogin(state: State, isLogin: boolean): void;
	setToken(state: State, token: string): void;
	setUserInfo(state: State, user: UserInfo): void;
};
const mutations: MutationTree<State> & Mutations = {
	setIslogin(state, isLogin) {
		state.isLogin = isLogin;
	},
	setToken(state, token) {
		state.token = token;
	},
	setUserInfo(state, user) {
		state.userInfo = user;
	},
};

export type Store<S = State> = Omit<VuexStore<S>, "commit"> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload?: P | undefined,
		options?: CommitOptions
	): ReturnType<Mutations[K]>;
};

export const UserModule: Module<State, RootState> = {
	state,
	mutations,
};
