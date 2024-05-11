import { createStore, createLogger } from 'vuex';
import { AppModule as app, AppStore, AppState } from './modules/app';
import { DocModule as doc, Store as DocStore, State as DocState } from './modules/doc';
import { UserModule as user, Store as UserStore, State as UserState } from './modules/user';
export type State = {
  app: AppState;
  doc: DocState;
  user: UserState;
};

export type Store = AppStore<Pick<State, 'app'>> & DocStore<Pick<State, 'doc'>> & UserStore<Pick<State, 'user'>>;

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()];

export const store = createStore({
  plugins: plugins,
  modules: {
    app,
    doc,
    user
  }
});

export function useStore(): Store {
  return store as Store;
}

export default store;
