import { MutationTree, Module, Store as VuexStore, CommitOptions } from "vuex";
import { State as RootState } from "./../index";
import { DeviceEnum } from "@/types/enum";
import { AppRouteRecordRaw } from "@/router/type";

export type AppState = {
  device: DeviceEnum; // 设备类型
	closeSiderBar: boolean; // 移动端关闭侧边栏
	appRouter: AppRouteRecordRaw[]; // 所有路由
};

const state: AppState = {
  device: DeviceEnum.Desktop,
	closeSiderBar: false,
	appRouter: []
};

export type AppMutations = {
	setDevice(state: AppState, device: DeviceEnum): void;
	setCloseSiderBar(state: AppState, opened: boolean): void;
	setAppRouter(state: AppState, routes: AppRouteRecordRaw[]): void;
};
const mutations: MutationTree<AppState> & AppMutations = {
	setDevice(state, device) {
		state.device = device;
	},
	setCloseSiderBar(state, opened) {
		state.closeSiderBar = opened;
	},
	setAppRouter(state, routes) {
		state.appRouter = routes;
	}
};

export type AppStore<S = AppState> = Omit<VuexStore<S>, "commit"> & {
	commit<K extends keyof AppMutations, P extends Parameters<AppMutations[K]>[1]>(
		key: K,
		payload?: P | undefined,
		options?: CommitOptions
	): ReturnType<AppMutations[K]>;
};

export const AppModule: Module<AppState, RootState> = {
	state,
	mutations,
};
