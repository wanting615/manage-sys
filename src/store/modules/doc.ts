import { DocType } from '@/types/doc';
import { MutationTree, Module, Store as VuexStore, CommitOptions, GetterTree } from 'vuex';
import { State as RootState } from './../index';

export type State = {
  docTypeList: DocType[]; //是否显示底部栏
};
const state: State = {
  docTypeList: []
};

export type Mutations<S = State> = {
  setDocTypeList(state: S, isShow: DocType[]): void;
};
const mutations: MutationTree<State> & Mutations = {
  setDocTypeList(state: State, docTypeList: DocType[]) {
    state.docTypeList = docTypeList;
  }
};

// getters types
export type Getters = {};

// getters
export const getters: GetterTree<State, RootState> & Getters = {};

export type Store<S = State> = Omit<VuexStore<S>, 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P | undefined,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export const DocModule: Module<State, RootState> = {
  state,
  mutations
};
