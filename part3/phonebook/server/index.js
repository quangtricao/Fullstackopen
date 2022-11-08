require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Home Page</h1>')
})

app.get('/api/persons', morgan('tiny'), (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((person) => {
    response.send(
      `<div>Phonebook has info for ${person.length} people</div>
		<br/>
		<div>${Date().toString()}</div>`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post(
  '/api/persons',
  morgan(':method :url :status :res[content-length] :response-time ms :body'),
  (request, response, next) => {
    const data = request.body

    const person = new Person({
      name: data.name,
      number: data.number,
    })

    person
      .save()
      .then((savedPer) => {
        response.json(savedPer)
      })
      .catch((error) => {
        next(error)
      })
  }
)

app.put('/api/persons/:id', (request, response, next) => {
  let data = request.body

  const person = {
    number: data.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
