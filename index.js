const express = require('express');
const path = require('path');
const dbData = require("./db/db.json");
const { writeFile } = require('fs');
const dbArray = []

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// GET request for notes
app.get('/api/notes', (req, res) => {
  
  res.json(dbData)
  // res.status(200).json(dbData);
});
// Post request for notes
app.post('/api/notes', (req, res) => {
  
  const noteData = req.body

  dbArray.push(noteData)

  const pushedNote = JSON.stringify(dbArray)

  writeFile(path.join(__dirname, './db/db.json'), pushedNote , (err) =>{
    if (err){
      console.log(err)
    }
  })
  //pull out data from req.body
  //push to the db array (importing from db)
  // write to file (db.json)
  res.status(200).json(dbData);
});
// DELETE request for notes
app.delete('/api/notes', (req, res) => {
  res.json(dbData)
  // res.status(200).json(dbData);
  // reviews = reviews.filer(review => review.review_id != req.params.id)
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// POST request to add a review
// NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      review_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});