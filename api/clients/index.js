// Load mongoose
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
const clientSchema = new mongoose.Schema({
  clientName: String,
  status: {
    // Add completed property
    type: Boolean, // Set type to boolean
    default: true, // Set default to false
  },
  prontoData: Object,
  clientData: {
    type: String,
    officeLocation: String,
  },
  jobs: Array,
});

// Create a model using our schema
// This model will be used to access the database
const ClientModel = mongoose.model("client", clientSchema);
console.log(ClientModel);

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
      await getClient(context);
      break;
    // If post, create new task
    case "POST":
      await createClient(context);
      break;
    // If put, update task
    case "PUT":
      await updateClient(context);
      break;
  }
};

// Return clients
async function getClient(context) {
  console.log(context);
  // load client found from database
  const clients = await ClientModel.find();
  // return client
  context.res.body = { clients: clients };
}

// Create new Client
async function createClient(context) {
  // Read the uploaded client
  const body = context.req.body;
  // Save to database
  const client = await ClientModel.create(body);
  // Set the HTTP status to created
  context.res.status = 201;
  // return new object
  context.res.body = client;
}

// Update an existing function
async function updateClient(context) {
  // Grab the id from the URL (stored in bindingData)
  const id = context.bindingData.id;
  // Get the task from the body
  const client = context.req.body;
  // Update the item in the database
  const result = await ClientModel.updateOne({ clientId: id }, client);
  // Check to ensure an item was modified
  if (result.nModified === 1) {
    // Updated an item, status 204 (empty update)
    context.res.status = 204;
  } else {
    // Item not found, status 404
    context.res.status = 404;
  }
}
