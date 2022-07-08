import { createStore, createLogger } from 'vuex';
import { DocModule as doc, Store as DocStore, State as DocState } from "./modules/doc";
import { UserModule as user, Store as UserStore, State as UserState } from "./modules/user";
export type State = {
  doc: DocState;
  user: UserState;
}

export type Store = DocStore<Pick<State, 'doc'>> & UserStore<Pick<State, 'user'>>;

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export const store = createStore({
  plugins: plugins,
  modules: {
    doc,
    user
  },
})

export function useStore(): Store {
  return store as Store
}

export default store