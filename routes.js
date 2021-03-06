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
    console.log("jebe?");
    Recipe.find()
      .sort({ timestamp: -1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(404).json({ noRecipesFound: "No recipes found" }));
});

//@route    GET api/views
//@desc     Get recipes by most viewed
//@access   Public
router.get("/views", (req, res) => {
    Recipe.find()
      .sort({ views: -1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(404).json({ noRecipesFound: "No recipes found" }));
});


//@route    GET api/:id
//@desc     Get recipe by id
//@access   Public
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id).then(recipe => {
        res.json(recipe);
    })
    .catch(err => res.status(404).json({ recipenotfound: "No recipe found" }));
});


//@route    POST api/
//@desc     Create recipe
//@access   Public
router.post("/", (req, res) => {
      const newRecipe = new Recipe({
        name: req.body.name,
        desc: req.body.desc,
        ingr: req.body.ingr,
        inst: req.body.inst,
        views: Math.round(Math.random()*10000)
      });
  
      newRecipe.save().then(recipe => res.json(recipe));
});


//@route    POST api/:id
//@desc     Edit recipe
//@access   Public
router.post("/:id", (req, res) => {
    const updatedRecipe = new Recipe({
      name: req.body.name,
      desc: req.body.desc,
      ingr: req.body.ingr,
      inst: req.body.inst
    });

    Recipe.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updatedRecipe },
        { new: true }
    ).then(recipe => res.json(recipe));
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
    .catch(err => res.status(404).json({ recipenotfound: "No recipe found" }));
});


//@route    POST api/setfavourite/:id
//@desc     Toggle favouritness
//@access   Public
router.post(
    "/setfavourite/:id",
    (req, res) => {
        Recipe.findById(req.params.id).then(recipe => {
            let fBool = !recipe.favourite;
            if(recipe){
                Recipe.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $set: {favourite: fBool} },
                    { new: true }
                ).then(recipe => res.json(recipe));
            }
        })
        .catch(err => res.status(404).json({ recipenotfound: "No recipe found" }));
    }
  );

module.exports = router;