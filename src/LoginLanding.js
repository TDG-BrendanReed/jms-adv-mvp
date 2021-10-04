import React from "react";
import LoginContent from "./components/LoginContent";
import LoginHeader from "./components/LoginHeader";
import "./LoginLanding.css";

function LoginForm() {
  return (
    <div id="loginform">
      <LoginHeader title="Welcome!" />
      <LoginContent />
    </div>
  );
}

export default LoginForm;
