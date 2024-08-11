export const actions = {
  logout({commit}) {
    commit('clearUserData');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    document.cookie = 'access_token=; Max-Age=-99999999;';
    document.cookie = 'refresh_token=; Max-Age=-99999999;';
  }
};

export const mutations = {
  clearUserData(state) {
    state.user = null;
  }
};
