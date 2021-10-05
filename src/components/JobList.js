import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Table, Row, Col, Card } from "react-bootstrap";

function JobList(props) {
  console.log(props);
  console.log(props.jobList);
  console.log(props.userList);

  function onDragEnd(result) {}

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <h6>Users to Allocate:</h6>
          <Droppable droppableId="AssetBox">
            {(provided) => (
              <Container
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                style={{ minWidth: "18rem", minHeight: "300px" }}>
                {[
                  props.userList.user.map((userItem, i) => (
                    <Draggable
                      key={userItem._id}
                      draggableId={userItem._id}
                      index={i}>
                      {(provided) => (
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          id={i}
                          style={{
                            width: "15rem",
                            padding: "10px",
                            margin: "10px",
                          }}>
                          <Card.Text>{userItem.userData.displayName}</Card.Text>
                        </Card>
                      )}
                    </Draggable>
                  )),
                ]}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </Container>
      </DragDropContext>
      <br />
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
