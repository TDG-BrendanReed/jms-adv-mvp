/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph";
import { loginRequest } from "../authConfig";
import ProfileData from "./ProfileData";
import { Switch, Route } from "react-router-dom";
import Users from "../pages/Users";

function DashboardContainer() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  //ID to collect user from database matching authenticated user
  const tempId = accounts[0] && accounts[0].localAccountId;

  async function loadUser() {
    const url = "/api/users/" + tempId;
    try {
      // Uses fetch to call server
      const response = await fetch(url);

      const retrievedData = await response.json();

      if (retrievedData.user.length < 1) {
        const tempLoadStatus = false;
        RequestProfileData(tempLoadStatus);
      } else {
        // Put current user into state
        setUser(retrievedData.user[0]);
        // Update state to show the user has been loaded from DB
        setUserLoaded(() => true);
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
    const requestBody = {
      userId: tempId,
      userData: data,
    };
    // const response =
    // if we want to do something with the response such as verify success
    await fetch(
      "/api/users", // API location
      {
        method: "POST", // POST to create new item
        body: JSON.stringify(requestBody), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    setUserLoaded((userLoaded) => !userLoaded);
    setUserLoaded((userLoaded) => !userLoaded);
  }

  async function updateUser(data) {
    const requestBody = {
      userData: data,
      status: "Test",
    };
    const url = "/api/users/" + tempId;

    // const response =
    // if we want to do something with the response such as verify success
    await fetch(
      url, // API location
      {
        method: "PUT", // PUT to update item
        body: JSON.stringify(requestBody), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    // flip user status back to false to force system to collect updated information
    setUserLoaded((userLoaded) => !userLoaded);
  }

  function RequestProfileData(loadStatus) {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    if (!loadStatus) {
      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          callMsGraph(response.accessToken).then((response) => {
            postUser(response);
          });
        })
        .catch((e) => {
          // If silent method fails then try popup method

          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) => {
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
            updateUser(response);
          });
        })
        .catch((e) => {
          // If silent method fails then try popup method

          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) => {
              updateUser(response);
            });
          });
        });
    }
  }

  useEffect(() => {
    console.log("useEffect ran" + userLoaded);
    if (!userLoaded) {
      console.log("userloaded if check");
      loadUser();
    }
  }, [userLoaded]);

  return (
    <>
      {user ? (
        <>
          <Switch>
            <Route path="/JobView">
              <ProfileData user={user} />
            </Route>
            <Route path="/Users">
              <Users />
            </Route>
            <Route path="/Assets">
              <ProfileData user={user} />
              <ProfileData user={user} />
              <ProfileData user={user} />
            </Route>
            <Route path="/Clients">
              <ProfileData user={user} />
              <ProfileData user={user} />
              <ProfileData user={user} />
            </Route>
            <Route path="/Profile">
              <ProfileData user={user} />
            </Route>
          </Switch>
        </>
      ) : (
        <center>
          <Spinner variant="primary" animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h2>Loading...</h2>
        </center>
      )}
    </>
  );
}

export default DashboardContainer;
