import React from "react";
import { Container } from "react-bootstrap";
import LoginContent from "./components/LoginContent";
import LoginHeader from "./components/LoginHeader";

function LoginForm() {
  return (
    <Container id="loginform">
      <LoginHeader title="Welcome!" />
      <LoginContent />
    </Container>
  );
}

export default LoginForm;
