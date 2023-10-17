     let myName = prompt("Enter your name");
    // let sender = document.getElementById("sender")
    // let sender_message = document.getElementById("sender_message")
    // let reciver = document.getElementById("reciver")
    // let reciver_message = document.getElementById("reciver_message")

function sendMessage(){
    let message = document.getElementById('text-area').value;
    firebase.database().ref("message").push().set({
        "sender": myName,
        "message": message

    });
    
    return false;
}

//Listen for incoming Message
firebase.database().ref("message").on("child_added" , function (snapshot){
    let html ="";
    //Give a unique id to every message
     html += `<h2 id='message-" + snapshot.key + "'>`;

    //Show delet Button if message is send by me
    if(snapshot.val().sender == myName){
        html += "<button data-id='"+ snapshot.key + "' onclick='deletMessage(this);'>"
            html += 'Delet';
        html += "</button>"
    }

            html +=snapshot.val().sender + ' : ' + snapshot.val().message;
    html += '</h2>';
    document.getElementById('test').innerHTML += html;
})

function deletMessage(self){
    //get Message ID
    let messageId = self.getAttribute("data-id");
    //delet message
    firebase.database().ref("message").child(messageId).remove();
}

//Attact delet message
firebase.database().ref("message").on("child_removed" , function(snapshot){
    //Give Message
    document.getElementById("message-" + snapshot.key) .innerHTML = "This message has been removed"; 
});