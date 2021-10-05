import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Table, Row, Col, Card } from "react-bootstrap";

function JobList(props) {
  const [jobArray, setJobArray] = useState(null);
  console.log(props);
  console.log(props.jobList);
  console.log(props.userList);
  console.log(jobArray);

  function displayUserName(userId) {
    userDisplayNameIndex = props.userList.user.find(function (user, i) {
      if (user._id === userId) return i;
    });
    console.log(userDisplayNameIndex);
    console.log(props.userList.user[userDisplayNameIndex]);
    return (
      <p>{props.userList.user[userDisplayNameIndex].userData.displayName}</p>
    );
  }

  function onDragEnd(result) {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== "AssetBox") {
      const droppableSplit = destination.droppableId.split(":");
      console.log(droppableSplit[2]);
      const tempArray = Array.from(jobArray[droppableSplit[2]].user);
      console.log(tempArray);
      tempArray.splice(destination.index, 0, draggableId);
      const tempJobArray = [...jobArray];
      console.log(tempJobArray);
      tempJobArray[droppableSplit[2]].user = tempArray;
      console.log(tempJobArray);
      setJobArray(() => tempJobArray);
    }
  }

  useEffect(() => {
    setJobArray(props.jobList.jobs);
    console.log("use effect ran");
    console.log("testing gh actions");
  }, [props.jobList.jobs]);

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
                      <Droppable
                        droppableId={"user:" + jobItem._id + ":" + { i }}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {[
                              jobItem.users.map((userItem, i) => (
                                <div>
                                  <Draggable
                                    key={jobItem._id + ":" + userItem}
                                    draggableId={jobItem._id + ":" + userItem}
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
                                            {displayUserName(userItem.Id)}
                                          </Card.Text>
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                </div>
                              )),
                            ]}
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
