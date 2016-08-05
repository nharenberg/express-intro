$(() => {
  $(".delete").on("click", "delete", deleteMessage);
  $(`.inputForm`).submit(addNewMessage);
})



function deleteMessage() {
  event.preventDefault();
  console.log("delete");

  $.ajax(`/messages`, {
    method: "DELETE"
  })
  .done(() => {
    console.log("delete success!");

    //$(this).closest("tr").rid()
    renderList();

  })
  .fail (err => {
    console.log("err:", err);
  })
}

function addNewMessage(e){
  console.log("submit pressed!")
  e.preventDefault();
  var message = { 
  message: $("input.message").val()
  }

  $("input.message").val('');

  appendMessages(message);

}

function appendMessages(message) {

  var $message = $('message')
    $message.find('.message').text(message.message);
   
  $('.messages').append($message);
}

function renderList() {
console.log('renderList!!!');
  $.get("/messages")
    .done(messages => {
      $(".message").empty();
      let $ps = messages.map(message => {
        let $p = $("#template").clone();
        $p.removeAttr("id");
        return $tr

      })
    })
}