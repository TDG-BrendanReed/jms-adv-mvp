import React from "react";
import { Table } from "react-bootstrap";

function UserList(users) {
  console.log(users.user);
  return (
    <>
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
          {users.user.map((user, i) => (
            <tr id={i}>
              <td>{user._id}</td>
              <td>{user.givenName}</td>
              <td>{user.surname}</td>
              <td>{user.userPrincipalName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserList;
