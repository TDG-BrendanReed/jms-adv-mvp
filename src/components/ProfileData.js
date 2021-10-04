import React from "react";

/**
 * Renders information about the user obtained from Microsoft Graph
 */
function ProfileData(props) {
  console.log(props);
  return (
    <div id="profile-div">
      <p>
        <strong>First Name: </strong> {props.user.userData.givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {props.user.userData.surname}
      </p>
      <p>
        <strong>Email: </strong> {props.user.userData.userPrincipalName}
      </p>
      <p>
        <strong>Id: </strong> {props.user.userData.id}
      </p>
    </div>
  );
}

export default ProfileData;
