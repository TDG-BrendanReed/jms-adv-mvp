import React from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  return (
    <>
      <Navbar bg="light" variant="dark">
        <Container>
          <a className="navbar-brand" href="/">
            MVP
          </a>
          <Navbar.Brand to="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Users">Link</NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item to="/Assets">Action</NavDropdown.Item>
                <NavDropdown.Item to="/Orders">Another action</NavDropdown.Item>
                <NavDropdown.Item to="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="/">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <SignOutButton />
        </Container>
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
