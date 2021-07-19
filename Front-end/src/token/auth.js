export const AUTH = () => {
  //   localStorage.setItem("token", "helloji");
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
