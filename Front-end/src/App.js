import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import ViewBlog from "../src/components/blog/detail/viewBlog";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/blog/:id" exact>
          <ViewBlog />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
