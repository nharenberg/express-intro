const PORT = process.env.PORT || 8000;

const express = require ("express");

const app = express();

const bodyParser = require("body-parser");

const uuid = require("uuid");
const path = require("path");

let Cat = require("./models/cat");

const morgan = require("morgan");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));



//method = GET
//url: /
app.use(express.static('public'));

app.get("/", (req, res) => {  
  let filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});


app.get("/timestamp", (req, res) => {
  res.send({timestamp: Date.now()});
});


app.route("/cats")
    .get((req, res) => {
      //GET /cats - get all the cats

      Cat.getAll(function(err, cats) {
        if(err){
          res.status(400).send(err);
        } else {
          res.send(cats);
        }

      });

    })
    .post((req, res) => {
      // POST /cats - create a new cat
      Cat.create(req.body, function(err){
        if(err){
          res.status(400).send(err);
        } else{
          res.send();
        }

      })
    })


app.route('/cats/:id')
    .get((req, res) => {
      res.send(`here is cat #${req.params.id}!`);
    })
    .put((req, res) => {
      //res.send(`editing cat #${req.params.id}`);
      //console.log(`in input`, req.params);
      Cat.update(req.params.id,req.body, function(err){
        if (err){
          res.status(400).send(err);
        } else {
          res.send();
        }
      })
    })
    .delete((req, res) => {
      Cat.rid(req.params.id, (err) => {
        if(err){
          res.status(400).send(err);
        } else{
          res.send();
        }
      })
    });


app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`)
});

// const http = require("http");

// let server = http.createServer(app);

// server.listen(PORT, err => {
//   console.log(err || `Server listening on port ${PORT}`);
// })