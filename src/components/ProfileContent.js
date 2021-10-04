/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph";
import { ProfileData } from "./ProfileData";
import { loginRequest } from "../authConfig";

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
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
        const tempLoadStatus = false;
        RequestProfileData(tempLoadStatus);
      } else {
        console.log("array length is 1");
        // Put current user into state
        setUser(retrievedData.user[0]);
        // Update state to show the user has been loaded from DB
        setUserLoaded(true);
        const tempLoadStatus = true;
        // Update the user with most current data from MS Graph
        RequestProfileData(tempLoadStatus);
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

  async function updateUser(data) {
    console.log("made it into update function");
    console.log(data);
    const requestBody = {
      userData: data,
      status: "Active",
    };
    const url = "/api/users/" + tempId;
    console.log("update URL" + url);
    const response = await fetch(
      url, // API location
      {
        method: "POST", // POST to create new item
        body: JSON.stringify(requestBody), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    console.log("PUT Response: ");
    console.log(response);
  }

  function RequestProfileData(loadStatus) {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    console.log(loadStatus);
    if (!loadStatus) {
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
          // If silent method fails then try popup method
          console.log(e);
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) => {
              console.log(response);

              console.log("posting user from catch");
              postUser(response);
            });
          });
        });
    } else {
      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          callMsGraph(response.accessToken).then((response) => {
            console.log(response);
            console.log("updating user");
            updateUser(response);
          });
        })
        .catch((e) => {
          // If silent method fails then try popup method
          console.log(e);
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) => {
              console.log(response);

              console.log("updating user from catch");
              updateUser(response);
            });
          });
        });
    }
  }

  useEffect(() => {
    if (!userLoaded) {
      loadUser();
    }
  }, [userLoaded]);

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
