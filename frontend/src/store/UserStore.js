export const initialState = {
  user: {},
  loggedIn: false,
};

export default {
  state: initialState,
  mutations: {
    clearStore(state) {
      state.user = {};
      state.loggedIn = false;
    },
    setUser(state, payload) {
      state.user = payload;
      state.loggedIn = true;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getUserLoggedIn(state) {
      return state.loggedIn;
    }
  }
}