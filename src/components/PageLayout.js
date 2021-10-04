import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <a className="navbar-brand" href="/">
          MVP
        </a>
        <SignOutButton />
      </Navbar>
      <h5>
        <center>Welcome</center>
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};
