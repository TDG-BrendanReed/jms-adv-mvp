import React from "react";
import { Table } from "react-bootstrap";

function UserList(props) {
  console.log(props);
  console.log(props.userList);
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
          {props.userList.user.map((userItem, i) => (
            <tr id={i}>
              <td>{userItem._id}</td>
              <td>{userItem.givenName}</td>
              <td>{userItem.surname}</td>
              <td>{userItem.userPrincipalName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserList;
