import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const clearLocalDB = () => {
    localStorage.clear();
    history.push("/");
  };

  return <div>{clearLocalDB()}</div>;
};

export default Logout;
