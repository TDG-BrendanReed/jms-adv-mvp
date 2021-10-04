import React, {useState} from "react";
import { Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { callMsGraph } from "../graph";
import { ProfileData } from "./ProfileData";
import { loginRequest } from "../authConfig";

function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [user, setUser] = useState({
        MSALData: null,
        userId: null,
        firstName: null,
        surname: null,
        email: null
    })
    const name = accounts[0] && accounts[0].name;
    const tempId = accounts[0] && accounts[0].localAccountId;

    async function loadUser() {
        setUser({
            MSALData: accounts[0] && accounts[0],
            userId: tempId
        })
        console.log(tempId)
        console.log(user)
        const url = "/api/users/"+tempId;
        try {
          // Uses fetch to call server
          const response = await fetch(url);
          console.log(response)

          const retrievedData = await response.json();

          console.log("retrieve user")
          console.log(retrievedData)
          console.log(retrievedData.user.length)
          if(retrievedData.user.length < 1){
            console.log("requesting profile data flow")  
            RequestProfileData()
          } else {
              console.log("array length less than 1")
          }

          
        
      } catch (error) {
          // If there is an error, display a generic message on the page
         console.log("something went wrong")
         console.log(error.message)
         
      }
    
    }

    async function postUser() {
        console.log("made it into function")
        const response = await fetch(
          '/api/users', // API location
          {
              method: 'POST', // POST to create new item
              body: JSON.stringify(user), // Add task to body
              headers: {
                  'Content-Type': 'application/json' // Set return type to JSON
              }
              
          }
          
      );
      console.log('Response: ')
      console.log(response)
        }

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
            setUser({
                firstName: graphData.givenName,
                surname: graphData.surname,
                email: graphData.userPrincipalName
            })
            console.log("posting user")
            console.log(user)
            postUser()
            
            
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
                console.log("posting user from catch")
                postUser()
                
            });
        });
        
    }

    return (
         <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={loadUser}>Check Account</Button>
            }
        </>
    );
};

export default ProfileContent;