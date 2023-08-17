const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Define a Person Prototype
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model
const newPerson = new Person({
  name: "John Doe",
  age: 30,
  favoriteFoods: ["burrito", "pizza"],
});

newPerson.save(function (err, data) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Saved:", data);
  }
});

//Create Many Records with model.create()
const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["sushi", "pasta"] },
  { name: "Bob", age: 28, favoriteFoods: ["burger", "salad"] },
];

Person.create(arrayOfPeople, function (err, people) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Created:", people);
  }
});

//Use model.find() to Search Your Database
Person.find({ name: "Alice" }, function (err, results) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Results:", results);
  }
});

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: "burger" }, function (err, person) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Person:", person);
  }
});
//Use model.findById() to Search Your Database By _id
const personId = "your_person_id_here";

Person.findById(personId, function (err, person) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Person:", person);
  }
});
// Perform Classic Updates by Running Find, Edit, then Save
const personId = "your_person_id_here";
const foodToAdd = "hamburger";

Person.findById(personId, function (err, person) {
  if (err) {
    console.error("Error:", err);
  } else {
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, updatedPerson) {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Updated Person:", updatedPerson);
      }
    });
  }
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
const personName = "Alice";

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true }, // Return the updated document
  function (err, updatedPerson) {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Updated Person:", updatedPerson);
    }
  }
);
//Delete One Document Using model.findByIdAndRemove
const personId = "your_person_id_here";

Person.findByIdAndRemove(personId, function (err, removedPerson) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Removed Person:", removedPerson);
  }
});
//Delete Many Documents with model.remove()
const personName = "Mary";

Person.remove({ name: personName }, function (err, result) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Result:", result);
  }
});
//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "burrito" })
  .sort({ name: 1 }) // Sort by name in ascending order
  .limit(2) // Limit to 2 results
  .select("-age") // Hide the age field
  .exec(function (err, data) {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Results:", data);
    }
  });
