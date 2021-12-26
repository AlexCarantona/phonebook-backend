const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
