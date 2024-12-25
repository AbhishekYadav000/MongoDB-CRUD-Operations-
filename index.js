const mongoose = require('mongoose');

// MongoDB connection URL
const MONGO_URI = 'mongodb://localhost:27017/Week8'; 

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => {
    console.log("Error occurred during connection", err);
});

db.once('connected', () => {
    console.log(`Connected to ${MONGO_URI}`);
});

// Define the schema
const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: String,
    salary: Number
});

// Define the model
const Person = mongoose.model('Person', PersonSchema, 'personCollection');

// Insert a single document
const doc1 = new Person({ name: 'Jacky', age: 362, gender: "Male", salary: 3456 });

doc1.save()
    .then(doc => {
        console.log("Document added successfully:", doc);
    })
    .catch(err => {
        console.error("Error adding document:", err);
    });

// Insert multiple documents
const manyPersons = [
    { name: 'Simon', age: 42, gender: "Male", salary: 3456 },
    { name: 'Neesha', age: 23, gender: "Female", salary: 1000 },
    { name: 'Mary', age: 27, gender: "Female", salary: 5402 },
    { name: 'Mike', age: 40, gender: "Male", salary: 4519 }
];

Person.insertMany(manyPersons)
    .then(() => console.log("Data inserted"))
    .catch(err => console.error(err));

// Fetching Data
Person.find().limit(5).then(docs => console.log(docs)).catch(err => console.error(err));

// // Filtering Data
const givenAge = 15;
Person.find({ age: { $gt: givenAge } }).then(docs => {
    console.log("Showing age greater than 15:", givenAge);
    docs.forEach(doc => console.log(doc.age, doc.name));
}).catch(err => console.error(err));

// // Counting Documents
Person.countDocuments().exec().then(count => console.log("Total document count:", count)).catch(err => console.error(err));

// Deleting Documents
Person.deleteMany({ age: { $gte: 25 } }).exec().then(docs => console.log('Deleted documents:', docs)).catch(err => console.error(err));

// // Updating Documents
Person.updateMany({ gender: "Female" }, { salary: 5555 }).exec().then(docs => console.log("Updated documents:", docs)).catch(err => console.error(err));
