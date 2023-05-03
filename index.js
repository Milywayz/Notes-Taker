const express = require('express');
const path = require('path');
const dbData = require("./db/db.json");
const { writeFile } = require('fs');
const uuid = require('./public/assets/js/uuid')

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
  const noteDataId = uuid()
  noteData.id = noteDataId;

  dbData.push(noteData)
  const pushedNote = JSON.stringify(dbData)

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
app.delete('/api/notes/:id', (req, res) => {
  
  
  reviews = reviews.filer(review => review.review_id != req.params.id)
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
