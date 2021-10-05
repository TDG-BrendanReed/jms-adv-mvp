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
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Container
                  style={{
                    minWidth: "18rem",
                    minHeight: "100px",
                    background: "light-grey",
                  }}>
                  {[
                    props.userList.user.map((userItem, i) => (
                      <div>
                        <Draggable
                          key={userItem._id}
                          draggableId={userItem._id}
                          index={i}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}>
                              <Card
                                id={i}
                                style={{
                                  width: "15rem",
                                  padding: "10px",
                                  margin: "10px",
                                }}>
                                <Card.Text>
                                  {userItem.userData.displayName}
                                </Card.Text>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    )),
                  ]}
                  {provided.placeholder}
                </Container>
              </div>
            )}
          </Droppable>
        </Container>

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
                      <Droppable droppableId="jobItem._id">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <td>Asset Placeholder</td>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <td>User Placeholder</td>
                      <td>Job #: {jobItem.jobNumber}</td>
                      <td>
                        {jobItem.status ? <p>Active</p> : <p>Archived</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </DragDropContext>
    </>
  );
}

export default JobList;
