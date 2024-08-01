import {ActionTree, GetterTree, MutationTree} from 'vuex';

// basic state
export const state = () => ({
  counter: 0
});

export type RootState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<RootState, RootState> = {
  counter: state => state.counter
};

// changing state mutations
export const mutations: MutationTree<RootState> = {
  increment(state) {
    state.counter++;
  }
};

// something to perform async operations and mutations commits
export const actions: ActionTree<RootState, RootState> = {
  increment({commit}) {
    commit('increment');
  }
};
