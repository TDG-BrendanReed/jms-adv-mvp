import React from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Link className="navbar-brand" to="/">
            MVP
          </Link>
          <Navbar.Brand to="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Users">Link</Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/Assets">Assets</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Order">Another action</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/">Something</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/">Separated link</Link>
                </NavDropdown.Item>
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
