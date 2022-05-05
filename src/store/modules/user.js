const state = {
  token: null,
  adminList: [],
};

const mutations = {
  logout(state) {
    state.token = null;
  },
  saveToken(state, token) {
    state.token = token;
  },
  addAdmin(state, communityID) {
    state.adminList.push(communityID);
  },
};

export default {
  state,
  mutations,
};
