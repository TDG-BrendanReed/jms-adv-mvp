import React from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
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
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Users">
                <Nav.Link>Link</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <LinkContainer to="/Assets">
                  <NavDropdown.Item>Assets</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Orders">
                  <NavDropdown.Item>Another action</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Orders">
                  <NavDropdown.Item>Something</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/Orders">
                  <NavDropdown.Item>Separated link</NavDropdown.Item>
                </LinkContainer>
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
