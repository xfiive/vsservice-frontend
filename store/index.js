export const actions = {
  logout({commit}) {
    commit('clearUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.$router.push('/admin/login');
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },

};

export const state = () => ({
  user: null,
});


