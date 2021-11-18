var ip = require("ip");
var soap = require("soap");
var { v4: uuidv4 } = require("uuid");
var wsdl =
  "https://onlineavl2api-au.navmanwireless.com/onlineavl/api/V3.0/service.asmx?WSDL";
var guid = "00000000-0000-0000-0000-000000000000";
var userName = "tdcs.api";
var nmPass = "Ccm54FLc";
var genGuid = uuidv4();
var appID = genGuid;
var clientId = genGuid;
var clientVersion = "19.4.2001.912";
var ipAddress = ip.address();
console.log("testing date");
console.log(new Date().toISOString());
var dateTime = new Date().toISOString();

soap.createClient(wsdl, function (err, client) {
  //methods execute here
  console.log(client.describe());
  console.log(err);
  client.addHttpHeader(
    "SOAPAction",
    "http://onlineavl2.navmanwireless.com/0907/DoLogin"
  );
  client.Service.ServiceSoap.DoLogin(
    {
      request: {
        Session: { SessionId: guid },
        UserCredential: {
          UserName: userName,
          Password: nmPass,
          ApplicationID: appID,
          ClientID: clientId,
          ClientVersion: clientVersion,
        },
        IPAddress: ipAddress,
        ClockVerificationUtc: dateTime,
      },
    },
    function (err, result, rawResponse, soapHeader, rawRequest) {
      // result is a javascript object
      // rawResponse is the raw xml response string
      // soapHeader is the response soap header as a javascript object
      // rawRequest is the raw xml request string
      console.log("do login");
      console.log(rawResponse);
      console.log(soapHeader);
      console.log(rawRequest);
      console.log(result.DoLoginResult);
      console.log("error");
      console.log(err);
    }
  );
});

/* // Load mongoose
const mongoose = require("mongoose");
// Connect to the database
mongoose.connect(
  process.env.CONNECTION_STRING, // Retrieve connection string
  {
    // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create the schema or structure of our object in Mongoose
const assetSchema = new mongoose.Schema({
  AssetName: String,
  status: {
    // Add completed property
    type: Boolean, // Set type to boolean
    default: true, // Set default to false
  },
  prontoData: Object,
  assetData: {
    registration: String,
    officeLocation: String,
  },
  jobs: Array,
});

// Create a model using our schema
// This model will be used to access the database
const AssetModel = mongoose.model("asset", assetSchema);
console.log(AssetModel);

// Export our function
module.exports = async function (context, req) {
  // setup our default content type (we always return JSON)
  context.res = {
    header: {
      "Content-Type": "application/json",
    },
  };

  // Read the method and determine the requested action
  switch (req.method) {
    // If get, return all tasks
    case "GET":
      await getAsset(context);
      break;
    // If post, create new task
    case "POST":
      await createAsset(context);
      break;
    // If put, update task
    case "PUT":
      await updateAsset(context);
      break;
  }
};

// Return assets
async function getAsset(context) {
  console.log(context);
  // load asset found from database
  const assets = await AssetModel.find();
  // return asset
  context.res.body = { assets: assets };
}

// Create new Asset
async function createAsset(context) {
  // Read the uploaded asset
  const body = context.req.body;
  // Save to database
  const asset = await AssetModel.create(body);
  // Set the HTTP status to created
  context.res.status = 201;
  // return new object
  context.res.body = asset;
}

// Update an existing function
async function updateAsset(context) {
  // Grab the id from the URL (stored in bindingData)
  const id = context.bindingData.id;
  // Get the task from the body
  const asset = context.req.body;
  // Update the item in the database
  const result = await AssetModel.updateOne({ _id: id }, asset);
  // Check to ensure an item was modified
  if (result.nModified === 1) {
    // Updated an item, status 204 (empty update)
    context.res.status = 204;
  } else {
    // Item not found, status 404
    context.res.status = 404;
  }
}
*/
