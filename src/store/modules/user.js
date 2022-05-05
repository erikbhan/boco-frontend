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
  addAdminList(state, communityIDArray) {
    if (!Array.isArray(communityIDArray)) return;
    if (communityIDArray.length === 0) return;
    for (let i = 0; i < communityIDArray.length; i++) {
      if (isNaN(communityIDArray[i])) continue;
      state.adminList.push(communityIDArray[i]);
    }
  },
};

export default {
  state,
  mutations,
};
