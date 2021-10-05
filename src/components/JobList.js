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
                {...provided.droppableProps}>
                {[
                  props.userList.user.map((userItem, i) => (
                    <Draggable draggableId={userItem._id} index={i}>
                      {(provided) => (
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          id={i}
                          style={{ width: "18rem" }}>
                          <Card.Title>
                            {userItem.userData.displayName}
                          </Card.Title>
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
