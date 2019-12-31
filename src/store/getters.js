const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user,
  avatar: state => state.user.avatar
};
export default getters
