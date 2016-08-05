const PORT = process.env.PORT || 8000;

const express = require ("express");

const app = express();

const bodyParser = require("body-parser");

const uuid = require("uuid");
const path = require("path");
const moment = require("moment");

let message = require("./models/message");

const morgan = require("morgan");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", 'pug'); // which engine for res.render to use
app.set('views', "./views"); // directory where pug files are lomessageed
app.use(morgan('dev'));

app.get("/", (req, res, next) => {

  message.getAll(function(err, messages) {

  res.render("index", { title: "Messager", messages });
  
  });


  //res.render();
  //find the index.pug file in views directory
  //render it into html
  //send that html
});

//method = GET
//url: /
app.use(express.static('public'));

// app.get("/", (req, res) => {  
//   let filePath = path.join(__dirname, "index.html");
//   res.sendFile(filePath);
// });


app.get("/timestamp", (req, res) => {
  res.send({timestamp: Date.now()});
});


app.route("/messages")
    .get((req, res) => {
      //GET /messages - get all the messages

      message.getAll(function(err, messages) {
        if(err){
          res.status(400).send(err);
        } else {
          res.send(messages);
        }

      });

    })
    .post((req, res) => {
      // POST /messages - create a new message
      message.create(req.body, function(err){
        if(err){
          res.status(400).send(err);
        } else{
          res.send();
        }

      })
    })


app.route('/messages')
    .get((req, res) => {
      res.send(`here is message #${req.params.id}!`);
    })
    .put((req, res) => {
      //res.send(`editing message #${req.params.id}`);
      //console.log(`in input`, req.params);
      message.update(req.params.id,req.body, function(err){
        if (err){
          res.status(400).send(err);
        } else {
          res.send();
        }
      })
    })
    .delete((req, res) => {

      let messageId = req.params.id;
      message.rid(req.params.id, (err) => {
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