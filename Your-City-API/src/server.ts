import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes, { RouteEndPoints } from './routes';

// Define Application Settings
const PORT = '3000';
const DB_CONNECTION = 'mongodb://api_db/your-city';

// Create Express Server
const app = express();

// Create MongoDB Connection Using Mongoose
mongoose.Promise = Promise;
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;

  console.info('Connection to MongoDB established.');
});

// Allow CORS
app.use(cors());

// Parse requests to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder example: 'http://localhost:3000/images/original/image.png
app.use(express.static('public'));

// Add OAuth
// app.use(OAuth.authorize());

// Add Routes to the API
for (const route in routes) {
  console.info(`Adding ${route} route to API.`);
  app.use(route, routes[route as RouteEndPoints]);
}

app.listen(PORT, () => {
  console.info(`The API is accessible on port ${PORT}.`);
});
