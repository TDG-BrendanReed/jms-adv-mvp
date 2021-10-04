import React from "react";
import "../LoginLanding.css";
import { SignInButton } from "./SignInButton";

const LoginContent = (props) => (
  <div>
    <div id="button" className="row">
      <SignInButton />
    </div>
  </div>
);

export default LoginContent;
