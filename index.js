require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
//Middleware
const morgan = require('morgan');
morgan.token('data', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
// Database management
const mongoose = require('mongoose');
const Person = require('./models/Person');

//Database connection.
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

app.get('/api/persons', (req, res) => {
  Person.find({})
  .then(persons => res.json(persons));
});

app.post('/api/persons', (req, res) => {
  const newNote = new Person(req.body);
  newNote.save(newNote)
  .then(response => res.json(newNote));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) res.json(person);
    else res.status(404).end()
  })
  .catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
  .then(r => res.status(204).end());
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id,
    {number: req.body.number},
    {new: true})
  .then(r => res.json(r))
  .catch(error => next(error))
});


// Error handling.
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id'})
  }
}
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
