const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <pwd> to return list; add <name> and <number> to insert new');
    process.exit(1);
}

const PWD = process.argv[2];
const MONGODB_URL = `mongodb+srv://phonebook-tester:${PWD}@phonebook.hikjl.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URL);

const personSchema = mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({})
        .then(results => {
            console.log('phonebook:');
            results.forEach(person => {
                console.log(person.name, person.number);
            });
            mongoose.connection.close();
        });
}

if (process.argv.length === 5) {
    const newPerson = new Person(
        {name: process.argv[3], number: process.argv[4]}
    );

    newPerson.save()
        .then(saved => {
            console.log(saved);
            mongoose.connection.close();
        });
}
