const state = {
  token: null,
};

const mutations = {
  logout(state) {
    state.token = null;
  },
  saveToken(state, token) {
    state.token = token;
  },
};

export default {
  state,
  mutations,
};
