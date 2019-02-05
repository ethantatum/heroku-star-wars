// Dependencies
// ===========================================================
const express = require("express");
const path = require(`path`);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Data
// ===========================================================
const characters = [{
  routeName: `yoda`,
  name: "Yoda",
  role: "Jedi Master",
  age: 900,
  forcePoints: 2000
},

{
  routeName: `darthmaul`,
  name: "Darth Maul",
  role: "Sith Lord",
  age: 200,
  forcePoints: 1200
},

{
  routeName: `obiwan`,
  name: `Obi-Wan Kenobi`,
  role: `Jedi Master`,
  age: 80,
  forcePoints: 1250
},

{
  routeName: `palpatine`,
  name: `Darth Sidious`,
  role: `Emperor`,
  age: 700,
  forcePoints: 3000
}];

// Routes
// ===========================================================
app.get("/", function(req, res) {
//   res.send(`Welcome to the Star Wars Page!
// May the schwartz be with you...`);
  res.sendFile(path.join(__dirname, `view.html`));
});

app.get(`/add`, function(req, res) {
  res.sendFile(path.join(__dirname, `add.html`));
})

app.get(`/api/characters`, function(req, res) {
  return res.json(characters);
});

app.get(`/api/characters/:character`, function(req, res) {
  let chosen = req.params.character;


  for(let i = 0; i < characters.length; i++) {
    if(chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }
  return res.json(false);
});

app.post(`/api/characters`, function(req, res) {
  let newCharacter = req.body;

  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  characters.push(newCharacter);

  res.json(newCharacter);
})


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
