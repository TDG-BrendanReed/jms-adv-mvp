import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph";
import { ProfileData } from "./ProfileData";
import { loginRequest } from "../authConfig";

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const name = accounts[0] && accounts[0].name;
  const tempId = accounts[0] && accounts[0].localAccountId;

  async function loadUser() {
    console.log(tempId);
    const url = "/api/users/" + tempId;
    try {
      // Uses fetch to call server
      const response = await fetch(url);
      console.log(response);

      const retrievedData = await response.json();

      console.log("retrieve user");
      console.log(retrievedData);
      console.log(retrievedData.user.length);
      if (retrievedData.user.length < 1) {
        console.log("requesting profile data flow");
        RequestProfileData();
      } else {
        console.log("array length is 1");
        setUser(retrievedData.user[0]);
      }
    } catch (error) {
      // If there is an error, display a generic message on the page
      console.log("something went wrong");
      console.log(error.message);
    }
  }

  async function postUser(data) {
    console.log("made it into function");
    console.log(data);
    const requestBody = {
      userId: tempId,
      userData: data,
    };
    const response = await fetch(
      "/api/users", // API location
      {
        method: "POST", // POST to create new item
        body: JSON.stringify(requestBody), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    console.log("Response: ");
    console.log(response);
  }

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          console.log(response);
          console.log("posting user");
          postUser(response);
        });
      })
      .catch((e) => {
        console.log(e);
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) => {
            console.log(response);

            console.log("posting user from catch");
            postUser(response);
          });
        });
      });
  }

  useEffect(() => {
    loadUser();
  }, [user]);

  console.log(user);
  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {user ? (
        <ProfileData user={user} />
      ) : (
        <Spinner variant="primary" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
}

export default ProfileContent;
