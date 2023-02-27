const express = require('express');

// path is part of the node standard library
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

// importing the public folder
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

// view engine
// app.set('view engine', 'ejs')

// route to go to index.html in the views folder
app.get("/", (request, response)=>{
    // response.send("Test for homepage")
    // response.render("index.html");
    response.sendFile(path.join(__dirname, "./views/index.html"))
    
});

// route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/views/notes.html'))
);

const everyRoute = require("./api/index.js");
app.use('/api', everyRoute)

// route to go to notes.html in the views folder
// app.get("/notes", (request, response)=>{
    // response.send("Test for homepage")
    // response.render("index.html");
    // response.sendFile(path.join(__dirname, "./views/notes.html"))
    
// });

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})