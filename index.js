const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    return Recipe.create({
      //object with first recipie
      title: 'teste',
      cuisine: 'Author'
    });
  })
  

  .then(() => {
    console.log('Iteration 3 - Insert multiple recipes: ');

    return Recipe.insertMany(data);       
  })

  .then(recipe => {
    console.log(recipe[0].title)    
  })

  .then(() => {
    console.log('Update recipe => The Rigatoni alla Genovese');

    return Recipe.findOneAndUpdate({title:'The Rigatoni alla Genove'}, {duration: 100});    
  })

  .then(() => {
    console.log('Remove a recipe => The Carrot Cake');

    return Recipe.deleteOne({title: 'Carrot Cake'});    
  })

  .then(() => {
    console.log('Out the database:');

    return mongoose.disconnect();
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
