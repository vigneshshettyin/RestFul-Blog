import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import ViewBlog from "../src/components/blog/detail/viewBlog";
import Panel from "../src/auth/panel";
import UpdateBlog from "../src/auth/components/updateBlog";
import Login from "../src/auth/login/login";
import Register from "../src/auth/register/register";
import CreateBlog from "./auth/components/createBlog";
import PrivateRoutes from "../src/token/privateRoute";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/blog/:id" component={ViewBlog} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoutes path="/update-blog/:id" component={UpdateBlog} exact />
        <PrivateRoutes path="/dashboard" component={Panel} exact />
        <PrivateRoutes path="/create-blog" component={CreateBlog} exact />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
