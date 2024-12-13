const { people } = require('../data')

const getPeople = (req, res) => {
  res.json(people)
}

const getPerson = (req, res) => {
  const id = parseInt(req.params.id)
  const person = people.find(person => person.id === id)
  
  if (!person) {
    return res.status(404).json({ success: false, message: `No person with id ${id}` })
  }
  
  res.status(200).json({ success: true, data: person })
}

const addPerson = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, message: 'Please provide a name' })
  }
  people.push({ id: people.length + 1, name: name })
  res.status(201).json({ success: true, name: name })
}

const updatePerson = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ success: false, message: 'Please provide a name' })
  }

  const person = people.find(person => person.id === parseInt(id))

  if (!person) {
    return res.status(404).json({ success: false, message: `No person with id ${id}` })
  }

  person.name = name
  res.status(200).json({ success: true, data: person })
}

const deletePerson = (req, res) => {
  const person = people.find(person => person.id === parseInt(req.params.id))
  
  if (!person) {
    return res.status(404).json({ success: false, message: `No person with id ${req.params.id}` })
  }

  const newPeople = people.filter(person => person.id !== parseInt(req.params.id))
  // Update the original array
  people.length = 0
  people.push(...newPeople)
  
  res.status(200).json({ success: true, data: people })
}

module.exports = {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson
}
