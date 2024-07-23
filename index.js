const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const user = require('./routes/user');
const tasks = require('./routes/tasks');

const fileUpload = require('express-fileupload');

app.use(
  fileUpload({
    debug: true,
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 4,
  }),
);
const cors = require('cors');
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const publicDirectoryPath = path.join(__dirname, './view');

app.use(express.static(publicDirectoryPath));

app.use('/course-file', express.static('course-file'));

app.use(express.json());
app.use('/users', user);
app.use('/tasks', tasks);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('app is on Port ' + port);
});
