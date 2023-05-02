const express = require('express');
const path = require('path');
const dbData = require("./db/db.json")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for reviews
app.get('/notes', (req, res) => {
  res.json(dbData)
  // res.status(200).json(dbData);
});

app.post('/notes', (req, res) => {

  //pull out data from req.body
  //push to the db array (importing from db)
  // write to file (db.json)
  res.status(200).json();
});

app.delete('/notes', (req, res) => {
  res.json(dbData)
  // res.status(200).json(dbData);
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// // POST request to add a review
// // NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Destructuring assignment for the items in req.body
//   const { product, review, username } = req.body;

//   // If all the required properties are present
//   if (product && review && username) {
//     // Variable for the object we will save
//     const newReview = {
//       product,
//       review,
//       username,
//       review_id: uuid(),
//     };

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });