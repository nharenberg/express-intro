
const request = require("request");


function getperson(id, callback){

    request.get(`http://swapi.co/api/people/${id}/`, function(err, response, body) {
      // console.log("err:", err);
      // console.log("body:", body)

      if(err){
        callback(err)
      }else{
        callback(null, body)
      }

      callback(body);

  });
}


getperson(16, function(err, body) {

  console.log("this is the body in the callback", body);

});