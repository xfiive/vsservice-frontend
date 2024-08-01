import {ActionTree, GetterTree, MutationTree} from 'vuex';

export const state = () => ({
  loggedIn: false,
  user: null
});

export type AuthState = ReturnType<typeof state>;

export const getters: GetterTree<AuthState, AuthState> = {
  isAuthenticated: state => state.loggedIn,
  currentUser: state => state.user
};

export const mutations: MutationTree<AuthState> = {
  setLoggedIn(state, value: boolean) {
    state.loggedIn = value;
  },
  setUser(state, user: any) {
    state.user = user;
  }
};

export const actions: ActionTree<AuthState, AuthState> = {
  async login({commit}, {username, password}) {
    const response = await this.$axios.post('/auth/login', {username, password});
    commit('setLoggedIn', true);
    commit('setUser', response.data.user);
  },
  logout({commit}) {
    commit('setLoggedIn', false);
    commit('setUser', null);
  }
};
