const express = require('express');
const app = express();

app.use(express.json());

let people = [{
    name: 'Donnie Trumpet',
    number: '1-234-2342',
    id: 1,
  },
  {
    name: 'Chance the Rapper',
    number: '2-2345-2342',
    id: 2,
  },
  {
    name: 'Vic Mensa',
    number: '3-45345-2342',
    id: 3,
  },
  {
    name: 'Cory Booker',
    number: '4-345-23423',
    id: 4,
  },
];

app.get('/', (req, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/people', (req, response) => {
  response.json(people);
});

app.get('/api/info', (req, response) => {
  response.send(`<p>Phonebook has info for ${people.length} people</p>
  <p>${new Date()}</p>`);
});

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('api/people/:id', (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);
  response.status(204).end()
});


const generateId = () => {
  const ID = math.random(10000000000)
  return ID
}

app.post('/api/people', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number || false,
    id: generateId()
  }

  people = people.concat(person)

  response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});