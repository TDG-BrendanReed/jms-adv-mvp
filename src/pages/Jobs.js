/* eslint-disable react-hooks/exhaustive-deps */
// Render list of jobs
import React, { useState, useEffect } from "react";
import { Spinner, Container, Form, Row, Col, Button } from "react-bootstrap";
import JobList from "../components/JobList";

function DashboardContainer() {
  const [jobs, setJobs] = useState(null);
  const [users, setUsers] = useState(null);
  const [jobInput, setJobInput] = useState({
    users: null,
    assets: null,
    client: {
      clientName: null,
      clientId: null,
    },
    jobNumber: null,
    status: null,
  });

  console.log(jobInput);
  async function loadUser() {
    try {
      // Uses fetch to call server
      const response = await fetch("/api/users/all");
      console.log(response);

      const retrievedData = await response.json();

      console.log("retrieve user");
      console.log(retrievedData);
      setUsers(retrievedData);
    } catch (error) {
      // If there is an error, display a generic message on the page
      console.log("something went wrong");
      console.log(error.message);
    }
  }
  async function loadJob() {
    try {
      // Uses fetch to call server
      const response = await fetch("/api/jobs/all");
      console.log(response);

      const retrievedData = await response.json();

      console.log("retrieve job");
      console.log(retrievedData);
      setJobs(retrievedData);
    } catch (error) {
      // If there is an error, display a generic message on the page
      console.log("something went wrong");
      console.log(error.message);
    }
  }
  async function postJob() {
    console.log(JSON.stringify(jobInput));
    const response = await fetch(
      "/api/jobs", // API location
      {
        method: "POST", // POST to create new item
        body: JSON.stringify(jobInput), // Add task to body
        headers: {
          "Content-Type": "application/json", // Set return type to JSON
        },
      }
    );
    console.log("Response: ");
    console.log(response);
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name + " : " + e.target.value.toString());
    if (e.target.name === "status") {
      // we want boolean for this
      setJobInput({ [e.target.name]: e.target.value });
    } else {
      // we want strings for this
      setJobInput({ [e.target.name]: e.target.value.toString() });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    // Call server
    postJob();
    // reload the job list
    loadJob();
  };

  /* async function updateJob(input, _id) {
    console.log("made it into update function");
    console.log(input);
    console.log(_id);
    const requestBody = {
      status: input,
    };
    const url = "/api/jobs/" + _id;
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
    loadJob();
    loadUser();
    const interval = setInterval(() => {
      loadJob();
      loadUser();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  console.log(jobs);
  console.log(users);
  const shouldRenderList = users && jobs;
  console.log(shouldRenderList);
  return (
    <>
      <Container>
        <h5 className="card-title">Jobs</h5>
        <h6> Create Job: </h6>
        <Form>
          <Row>
            <Col>
              <Form.Control
                onChange={handleChange}
                name="jobNumber"
                placeholder="Job Number #"
              />
            </Col>
            <Col>
              <Form.Select onChange={handleChange} name="status">
                <option value={true}>Active</option>
                <option value={false}>Archived</option>
              </Form.Select>
            </Col>
            <Col>
              <Button onClick={handleSubmit}>Submit Job</Button>
            </Col>
          </Row>
        </Form>
        <br />
        <h6> Job List: </h6>
        <br />
        {shouldRenderList ? (
          <JobList jobList={jobs} userList={users} />
        ) : (
          <center>
            <Spinner variant="primary" animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h2>Loading...</h2>
          </center>
        )}
      </Container>
    </>
  );
}

export default DashboardContainer;
