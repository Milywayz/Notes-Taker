// Requiring info
const express = require('express');
const path = require('path');
const dbData = require("./db/db.json");
const { writeFile } = require('fs');
const uuid = require('./public/assets/js/uuid')

// Server Uses and needed code 
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Path ways for html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  
  res.json(dbData)
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

  res.status(200).json(dbData);
});

// DELETE request for notes
app.delete('/api/notes/:id', (req, res) => {

    const id = (req.params.id)
    const dbDataIndex = dbData.findIndex(dbData => dbData.id == id)
    
    dbData.splice(dbDataIndex, 1);
    const deleteData = JSON.stringify(dbData)

    writeFile(path.join(__dirname, './db/db.json'), deleteData , (err) =>{
      if (err){
        console.log(err)
      }
    })
    
    return res.send();
});

// Listens for action for the server 
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
