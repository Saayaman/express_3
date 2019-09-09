const express = require('express');
const recipes = require('./models/recipes')
const uuidv1 = require('uuid/v1');

const app = express();

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // using querystring instead of qs

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
  res.json(recipes);
});

app.put('/api/recipes', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const image_url = req.body.image_url;

  // find the data of the id.
  // update that object
  // response = updated list
  

})

app.delete('/api/recipes', (req, res) => {
  const id = req.body.id;

  //delete that object with id
  res.json({ msg: 'Successfully deleted!' })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
