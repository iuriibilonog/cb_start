export const getUser = (state) => state.user.userinfo;
export const isLoggedIn = (state) => state.user.userinfo.isLoggedIn;
export const getToken = (state) => state.user.token;
export const getRefresh = (state) => state.user.refresh;
export const getUserRole = (state) => state.user.roleId;
export const getUserErrors = (state) => state.user.error;
