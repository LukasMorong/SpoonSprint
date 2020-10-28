const router = require('express').Router();

const Recipe = require('./Models/Recipe');

//@route    GET api/test
//@desc     Tests api
//@access   Public
router.get('/test', (req,res) => {
    res.json({
        status: 200,
        message: 'it works :)'
    })
});


//@route    GET api/
//@desc     Get recipes
//@access   Public
router.get("/", (req, res) => {
    Recipe.find()
      .sort({ date: -1 })
      .then(recipe => res.json(recipe))
      .catch(err => res.status(404).json({ noRecipesFound: "No recipes found" }));
});


//@route    POST api/
//@desc     Create recipe
//@access   Public
router.post("/", (req, res) => {
      const newRecipe = new Recipe({
        name: 'recept 1',
        desc: 'test recept',
        procedure: 'postup'
      });
  
      newRecipe.save().then(recipe => res.json(recipe));
});


//@route    DELETE api/:id
//@desc     Delete recipe
//@access   Public
router.delete('/:id', (req, res) => {
    Recipe.findById(req.params.id).then(recipe => {
        recipe.remove().then(() => {
            res.json({sucess: true});
        })
    })
    .catch(err => res.status(404).json({ recipenotfound: "No recipe fund" }));
});


module.exports = router;