const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const dataFilePath = path.join(__dirname, '../data/cats.json');

exports.getAll = function(cb) {

  // 1. read JSON file, to get the data
  // 2. parse the data, to get the array
  // 3. callback with the array
  //    (if there's an error, callback with an error)

  fs.readFile(dataFilePath, (err, buffer) => {
    if(err) return cb(err);

    let cats;

  try{
    cats = JSON.parse(buffer);
  } catch(err){
    cb(err);
    return;
  }
     
  // cats!!
  cb(null, cats);
  });

}

exports.update = function(id, cat, cb) {
 exports.getAll(function(err, cats) {
   if (err) return cb(err)
     else {
       cats.map((val, index) => {
         if (val.id === id) {
           cat.id = id
           cats.splice(index , 1)
           cats.push(cat);
         }
       });
       fs.writeFile(dataFilePath, JSON.stringify(cats), (err) => {
         cb(err)
       })
     }
   });
}

exports.create = function(catObj, cb) {

  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    catObj.id = uuid.v4()

    cats.push(catObj);

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
        cb(err);
    });
  });  
}

exports.rid = function(catObjId, cb) {
  
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

   // catObjId = uuid.v4()
    let index;

    for(let i = 0; i< cats.length; i++){

      if(cats[i].id === catObjId) {

        index = i;
        break;
      }
    }

    cats.splice(index, 1);

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      cb(err);
    });
  });
}
