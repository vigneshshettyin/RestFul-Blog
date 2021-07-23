import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled(Link)`
font-family: "Concert One", cursive;
font-size: 25px;
color: palevioletred;
padding: 5px;
border: 2px solid palevioletred;
border-radius: 3px;
  }
`;
const Header = () => {
  return (
    <>
      <div className="header p-3">
        <div className="col-md-8 jumbotron container-fluid">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <Button className="text-decoration-none" to="/logout">
            Logout!!
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
