/* eslint-disable react-hooks/exhaustive-deps */
// Render list of users
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import UserList from "../components/UserList";

function DashboardContainer() {
  const [users, setUsers] = useState(null);

  async function loadUser() {
    try {
      // Uses fetch to call server
      const response = await fetch("/api/users/all");
      console.log(response);

      const retrievedData = await response.json();

      console.log("retrieve user");
      console.log(retrievedData);
      console.log(retrievedData.user.length);
      setUsers(retrievedData);
    } catch (error) {
      // If there is an error, display a generic message on the page
      console.log("something went wrong");
      console.log(error.message);
    }
  }

  /* async function updateUser(input, _id) {
    console.log("made it into update function");
    console.log(input);
    console.log(_id);
    const requestBody = {
      status: input,
    };
    const url = "/api/users/" + _id;
    console.log("update URL" + url);
    const response = await fetch(
      url, // API location
      {
        method: "PUT", // PUT to update item
        body: JSON.stringify(requestBody), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    console.log("PUT Response: ");
    console.log(response);
  }
  */

  useEffect(() => {
    loadUser();
    const interval = setInterval(() => {
      loadUser();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  console.log(users);
  return (
    <>
      <h5 className="card-title">Users</h5>
      {users ? (
        <UserList userList={users} />
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
