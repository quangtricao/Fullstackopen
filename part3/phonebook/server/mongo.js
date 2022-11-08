const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://quangtricao:${password}@cluster0.kvzjilt.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  show: Boolean,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
} else if (process.argv.length === 3) {
  mongoose.connect(url).then(
    Person.find({ show: true }).then((result) => {
      console.log('phonebook: ')
      result.forEach((person) => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
  )
} else {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        show: true,
      })

      return person.save()
    })
    .then(() => {
      console.log(
        `add ${process.argv[3]} ${process.argv[4]} to phonebook`
      )
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
