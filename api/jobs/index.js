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
const jobSchema = new mongoose.Schema({
  jobNumber: String,
  status: {
    // Add completed property
    type: Boolean, // Set type to boolean
    default: true, // Set default to false
  },
  prontoData: Object,
  jobData: {
    date: String,
    jobLocation: String,
  },
  client: String,
  assets: Array,
  jobs: Array,
});

// Create a model using our schema
// This model will be used to access the database
const JobModel = mongoose.model("job", jobSchema);
console.log(JobModel);

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
      await getJob(context);
      break;
    // If post, create new task
    case "POST":
      await createJob(context);
      break;
    // If put, update task
    case "PUT":
      await updateJob(context);
      break;
  }
};

// Return jobs
async function getJob(context) {
  console.log(context);
  // load job found from database
  const jobs = await JobModel.find();
  // return job
  context.res.body = { jobs: jobs };
}

// Create new Job
async function createJob(context) {
  // Read the uploaded job
  const body = context.req.body;
  // Save to database
  const job = await JobModel.create(body);
  // Set the HTTP status to created
  context.res.status = 201;
  // return new object
  context.res.body = job;
}

// Update an existing function
async function updateJob(context) {
  // Grab the id from the URL (stored in bindingData)
  const id = context.bindingData.id;
  // Get the task from the body
  const job = context.req.body;
  // Update the item in the database
  const result = await JobModel.updateOne({ jobId: id }, job);
  // Check to ensure an item was modified
  if (result.nModified === 1) {
    // Updated an item, status 204 (empty update)
    context.res.status = 204;
  } else {
    // Item not found, status 404
    context.res.status = 404;
  }
}
