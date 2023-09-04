const mongoose = require("mongoose");

const connectToMongo = () => {
  const username = 'kyadavalli04';
  const password = 'Kousthubh%40mongo'; // Make sure to properly escape special characters in the password if required
  const clusterUrl = 'cluster0.2o0bzi6.mongodb.net';
  const databaseName = 'auth';

  mongoURI= `mongodb+srv://${username}:${password}@${clusterUrl}/${databaseName}?retryWrites=true&w=majority`
  
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
};

module.exports = connectToMongo;
