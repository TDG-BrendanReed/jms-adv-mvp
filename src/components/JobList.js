/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Table, Row, Col, Card, Form } from "react-bootstrap";

function JobList(props) {
  const [jobArray, setJobArray] = useState(props.jobList.jobs);
  const [jobSearch, setJobSearch] = useState(null);

  const handleSearchChange = (e) => {
    e.preventDefault();

    setJobSearch(e.target.value.toString());
    filterJobList(e.target.value.toString());
  };

  async function updateJobUserAllocation(userArray, id) {
    const requestBody = userArray;
    const url = "/api/jobs/jobUserUpdate:" + id;

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

    if (response.status === 204) {
      props.loadCallback();
    }
  }

  function filterJobList(searchTerm) {
    const regex = new RegExp(searchTerm, "i");

    // make sure there is a value to search...
    if (searchTerm) {
      const tempFiltered = props.jobList.jobs.filter((job) => {
        const userCheck = job.users.some((user) =>
          regex.test(user.displayName)
        );

        const assetCheck = job.assets.some((asset) =>
          regex.test(asset.displayName)
        );

        if (
          regex.test(job.jobNumber) ||
          regex.test(job.description) ||
          regex.test(job.client.clientName) ||
          userCheck ||
          assetCheck
        ) {
          return true;
        } else {
          return false;
        }
      });

      setJobArray(() => tempFiltered);
    } else {
      setJobArray(() => props.jobList.jobs);
    }
  }

  function onDragEnd(result) {
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

      const tempArray = Array.from(jobArray[droppableSplit[2]].users);

      // check if this id is already in the array for this job
      // if it is then we stop the assignment
      const checkDuplicate = tempArray.some(
        (user) => user.userId === draggableId
      );

      const tempUser = props.userList.user.find(
        (user) => user._id === draggableId
      );

      const tempDisplayName = tempUser.userData.displayName;

      const insertData = {
        userId: draggableId,
        displayName: tempDisplayName,
      };

      if (!checkDuplicate) {
        tempArray.splice(destination.index, 0, insertData);
        const tempJobArray = [...jobArray];

        tempJobArray[droppableSplit[2]].users = tempArray;
        // if user coming from another job delete from that job
        if (source.droppableId !== "AssetBox") {
          tempArray.splice(source.index, 1);
        }

        setJobArray(() => tempJobArray);
        // call update function to update db that user has been allocated
        updateJobUserAllocation(tempArray, droppableSplit[1]);
      } else {
        console.log("duplicate found no action taken");
      }
    }
    // remove from job array when placed back into the box
    if (destination.droppableId === "AssetBox") {
      const droppableSplit = source.droppableId.split(":");

      const tempArray = Array.from(jobArray[droppableSplit[2]].users);

      tempArray.splice(source.index, 1);
      const tempJobArray = [...jobArray];

      tempJobArray[droppableSplit[2]].users = tempArray;

      setJobArray(() => tempJobArray);
      // call update function to update db with removed user
      updateJobUserAllocation(tempArray, droppableSplit[1]);
    }
  }

  // refresh job array if the provided props update
  // (eg change in database)
  useEffect(() => {
    setJobArray(props.jobList.jobs);

    filterJobList(jobSearch);
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
                    minWidth: "10rem",
                    maxWidth: "10rem",
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
                                  width: "7rem",
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
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              {jobArray ? (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID#</th>
                      <th>Users</th>
                      <th>Assets</th>
                      <th>Job Number</th>
                      <th>Job Status</th>
                      <th>Client</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobArray.map((jobItem, i) => (
                      <tr
                        style={{
                          minHeight: "80px",
                        }}
                        id={i}>
                        <td>{jobItem._id}</td>
                        <Droppable
                          droppableId={"user:" + jobItem._id + ":" + i}>
                          {(provided) => (
                            <td
                              ref={provided.innerRef}
                              {...provided.droppableProps}>
                              <Container
                                style={{
                                  minWidth: "10rem",
                                  maxWidth: "10rem",
                                }}>
                                {[
                                  jobItem.users.map((userItem, i) => (
                                    <div>
                                      <Draggable
                                        key={
                                          jobItem._id + ":" + userItem.userId
                                        }
                                        draggableId={
                                          jobItem._id + ":" + userItem.userId
                                        }
                                        index={i}>
                                        {(provided) => (
                                          <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}>
                                            <Card
                                              id={i}
                                              style={{
                                                width: "7rem",
                                              }}>
                                              <Card.Text>
                                                {userItem.displayName}
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
                            </td>
                          )}
                        </Droppable>
                        <td>Asset Placeholder</td>
                        <td>Job #: {jobItem.jobNumber}</td>
                        <td>
                          {jobItem.status ? <p>Active</p> : <p>Archived</p>}
                        </td>
                        <td>{jobItem.client.clientName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
        </Container>
      </DragDropContext>
    </>
  );
}

export default JobList;
