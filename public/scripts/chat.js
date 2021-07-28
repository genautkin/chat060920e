const socket = io();


document.getElementById("sendButton").addEventListener("click", sendButtonPushed);
document.getElementById('mesInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendButtonPushed()
    }
});

socket.on('message', gotMessageFromServer)

function gotMessageFromServer (msg){
    var template = document.getElementById('incoming_msg').innerHTML;
    var rendered = Mustache.render(template, { message: msg, date: new Date().toLocaleTimeString()});
    document.getElementById('messagesBox').innerHTML += rendered;
}

function sendButtonPushed(){
        const mes = document.getElementById("mesInput").value;
        if (mes === '') {
            return;
        }
        sendMesToServer(mes);
    
}

function sendMesToServer(mes){
    socket.emit('chat message', mes)
    clearInput();
    var template = document.getElementById('outgoing_msg').innerHTML;
    var rendered = Mustache.render(template, { message: mes, date: new Date().toLocaleTimeString()});
    document.getElementById('messagesBox').innerHTML += rendered;
}


function clearInput(){
    document.getElementById("mesInput").value = ''
}