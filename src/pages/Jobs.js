/* eslint-disable react-hooks/exhaustive-deps */
// Render list of jobs
import React, { useState, useEffect } from "react";
import { Spinner, Container, Form, Row, Col, Button } from "react-bootstrap";
import JobList from "../components/JobList";

function DashboardContainer() {
  const [jobs, setJobs] = useState(null);
  const [jobInput, setJobInput] = useState({
    users: null,
    assets: null,
    client: null,
    jobNumber: null,
    status: null,
  });

  console.log(jobInput);
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
    console.log(e.target.name + " : " + e.target.value);
    setJobInput({ [e.target.name]: e.target.value });
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
    const interval = setInterval(() => {
      loadJob();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  console.log(jobs);
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
              <Form.Check onChange={handleChange} name="status" />
            </Col>
            <Col>
              <Button onClick={handleSubmit}>Submit Job</Button>
            </Col>
          </Row>
        </Form>
        <h6> Job List: </h6>
        <br />
        {jobs ? (
          <JobList jobList={jobs} />
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
