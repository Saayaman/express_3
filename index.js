const express = require('express');
const recipes = require('./models/recipes')
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');


const app = express();

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // using querystring instead of qs

//Connect to mongoDB
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  //when connection succeeds
  console.log('mongoDB connnection worked!');
})


app.get('/api/recipes', (req, res) => {
  // res.send("Recipes List")
  res.json(recipes);
});

app.post('/api/recipes', (req, res) => {
  const { image_url, name } = req.body;

  const newRecipes = {
    id: uuidv1(),
    image_url: image_url,
    name: name,
  };
  
  recipes.push(newRecipes);
  res.json({ msg: "new recipe added!"});
});

app.put('/api/recipes', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const image_url = req.body.image_url;

  const index = recipes.findIndex(k => k.id == id);

  recipes[index] = {
    id: id,
    name: name,
    image_url,
  }
  res.json(recipes);
})

app.delete('/api/recipes', (req, res) => {
  const id = req.body.id;

  const index = recipes.findIndex(k => k.id == id);

  recipes.splice(index, 1);
  res.json(recipes)

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
