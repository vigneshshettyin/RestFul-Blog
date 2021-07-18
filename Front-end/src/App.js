import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import ViewBlog from "../src/components/blog/detail/viewBlog";
import Panel from "../src/auth/panel";
import Login from "../src/auth/login/login";
import Register from "../src/auth/register/register";
import CreateBlog from "./auth/components/createBlog";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/blog/:id" exact>
          <ViewBlog />
        </Route>
        <Route path="/dashboard" component={Panel} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/create-blog" component={CreateBlog} exact />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
