import { MutationTree, Module, Store as VuexStore, CommitOptions} from 'vuex'
import { State as RootState } from './../index'

export type State = {
  token: string;
  isLogin: boolean;
}

const state: State = {
  token: '',
  isLogin: false
}

export type Mutations = {
  setIslogin(state: State, isLogin: boolean): void;
  setToken(state: State, token: string): void;
} 
const mutations: MutationTree<State> & Mutations = {
  setIslogin(state, isLogin){
    state.isLogin = isLogin;
  },
  setToken(state, token){
    state.token = token;
  }
}

export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P | undefined,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

export const UserModule: Module<State, RootState> = {
  state,
  mutations
}
