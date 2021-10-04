import React from "react";
import "../LoginLanding.css";
import { SignInButton } from "./SignInButton";

const LoginContent = (props) => (
  <div>
    <div id="button" class="row">
      <SignInButton />
    </div>
  </div>
);

export default LoginContent;
