import React from "react";
import { Container, Table, Row, Col } from "react-bootstrap";

function JobList(props) {
  console.log(props);
  console.log(props.jobList);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID#</th>
                  <th>Assets</th>
                  <th>Users</th>
                  <th>Job Number</th>
                  <th>Job Status</th>
                </tr>
              </thead>
              <tbody>
                {props.jobList.jobs.map((jobItem, i) => (
                  <tr id={i}>
                    <td>{jobItem._id}</td>
                    <td>Asset Placeholder</td>
                    <td>User Placeholder</td>
                    <td>Job #: {jobItem.jobNumber}</td>
                    <td>{jobItem.status ? <p>Active</p> : <p>Archived</p>}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default JobList;
