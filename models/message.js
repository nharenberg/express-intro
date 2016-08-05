const fs = require("fs");
const path = require("path");
const moment = require("moment");

const dataFilePath = path.join(__dirname, '../data/messages.json');

exports.getAll = function(cb) {

  // 1. read JSON file, to get the data
  // 2. parse the data, to get the array
  // 3. callback with the array
  //    (if there's an error, callback with an error)

  fs.readFile(dataFilePath, (err, buffer) => {
    if(err) return cb(err);

    let messages;
  try{
    messages = JSON.parse(buffer);
    console.log('messages:', messages);
  } catch(err){
    cb(err);
    return;
  }
     
  // messages!!
  cb(null, messages);
  });

}

exports.update = function(id, message, cb) {
 exports.getAll(function(err, messages) {
   if (err) return cb(err)
     else {
       messages.map((val, index) => {
         if (val.id === id) {
           message.id = id
           messages.splice(index , 1)
           messages.push(message);
         }
       });
       fs.writeFile(dataFilePath, JSON.stringify(messages), (err) => {
         cb(err)
       })
     }
   });
}

exports.create = function(messageObj, cb) {

  exports.getAll(function(err, messages) {
    if(err) return cb(err);

    messages.push(messageObj);

    fs.writeFile(dataFilePath, JSON.stringify(messages), function(err) {
        cb(err);
    });
  });  
}

exports.rid = function(messageObjId, cb) {
  
  exports.getAll(function(err, messages) {
    if(err) return cb(err);

   // messageObjId = uuid.v4()
    let index;

    for(let i = 0; i< messages.length; i++){

      if(messages[i].id === messageObjId) {

        index = i;
        break;
      }
    }

    messages.splice(index, 1);

    fs.writeFile(dataFilePath, JSON.stringify(messages), function(err) {
      cb(err);
    });
  });
}
