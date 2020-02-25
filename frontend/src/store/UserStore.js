export const initialState = {
  user: {},
  loggedIn: false,
};

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.loggedIn = true;
    },
    clearStore(state) {
      state.user = {};
      state.loggedIn = false;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    }
  }
}