import React from "react";
import { Container, Table } from "react-bootstrap";

function UserList(props) {
  console.log(props);
  console.log(props.userList);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {props.userList.user.map((userItem, i) => (
                  <tr id={i}>
                    <td>{userItem._id}</td>
                    <td>{userItem.userData.givenName}</td>
                    <td>{userItem.userData.surname}</td>
                    <td>{userItem.userData.userPrincipalName}</td>
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

export default UserList;
