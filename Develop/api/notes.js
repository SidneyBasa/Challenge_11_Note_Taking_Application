// Saturday February 25 2023
// This controller references the Pets api controller
// Written by Instructor Joe Rehfuss of the UW Coding bootcamp
// January 26th 2023

const express = require('express');
const router = express.Router();
const fs = require("fs")

// route to read notes
router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notesData = JSON.parse(data);
        console.log("here are the notes!")
        console.log(notesData)
        res.json(notesData);
      }
    });
  });
  
  // route to create notes
  router.post("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        
        const notesData = JSON.parse(data);

        // object to contain data from the notes page
        // const notesData = {
        //   title:request.body.title,
        //   text:request.body.text
        // }
        console.log("Test of notes data", data)

        notesData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data added!");
          }
        });
      }
    });
  });
  
  // route to select one note
  router.get("/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notesData = JSON.parse(data);
        for (let i = 0; i < notesData.length; i++) {
          const note = notesData[i];
          if (note.id == req.params.id) {
            return res.json(note);
          }
        }
        return res.send("no such note");
      }
    });
  });
  
  // route to update one note
  router.put("/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let notesData = JSON.parse(data);
        notesData = notesData.map((note) => {
          if (note.id == req.params.id) {
            return {
              id: req.body.id,
              title: req.body.title,
              text: req.body.text,
            };
          } else {
            return note;
          }
        });
        fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data updated!");
          }
        });
      }
    });
  });
  
  // route to delete note
  router.delete("/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let notesData = JSON.parse(data);
        notesData = notesData.filter((note) => {
          if (note.id == req.params.id) {
            return false;
          } else {
            return true;
          }
        });
        fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("note deleted!");
          }
        });
      }
    });
  });

module.exports = router;