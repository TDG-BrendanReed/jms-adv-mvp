export const msalConfig = {
    auth: {
      clientId: "2873d791-862a-4616-b6af-72e9738172fd", // process.env.MSALClientId
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "http://localhost:3000", //https://reedme.dev
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };