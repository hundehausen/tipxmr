import React, { Fragment } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import { OpenWallet } from "./";
import Signup from "~/pages/Signup";
import { Button } from "~/components";

function Login() {
  const { path, url } = useRouteMatch();
  console.log("path: ", path);
  console.log("url: ", url);

  return (
    <Fragment>
      <Route path={path} exact>
        <div className="flex flex-grow flex-col space-y-5 md:space-y-0 md:flex-row justify-around place-self-center">
          <Link to={`${url}/create`}>
            <Button>Create new wallet</Button>
          </Link>
          <Link to={`${url}/open`}>
            <Button>Open existing wallet</Button>
          </Link>
        </div>
      </Route>
      <Route path={`${path}/create`}>
        <Signup />
      </Route>
      <Route path={`${path}/open`}>
        <OpenWallet />
      </Route>
    </Fragment>
  );
}

export default Login;
