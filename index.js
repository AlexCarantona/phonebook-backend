const express = require('express');
const app = express();

app.use(express.json());

var persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
];

app.get('/', (req, res) => {
  res.send('<h1>Hi there</h1>');
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  let randomId = Math.floor(Math.random() * 99999);
  const newNote = {...req.body, id: randomId};
  res.json(newNote);
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id == req.params.id);
  if (person) res.json(person);
  else res.status(404).end()
});

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id);
  res.status(204).end();
});

app.get('/info', (req, res) => {
  const entries = persons.length;
  const now = Date().toString();
  res.send(`<p>We have ${entries} people registered.</p>
    <p>Request made at ${now}</p>`)
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
