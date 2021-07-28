const port = process.env.PORT || 3000
const express = require("express");

const app = express();

const http = require("http").Server(app);

const io = require("socket.io")(http);

const path = require("path");

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index");
    });

io.on("connection", (socket) => {
        console.log(socket.id)
        console.log("a user connected");
         //check When user disconnected
        socket.on('disconnect', () => {
            console.log(socket.id)
            console.log('user disconnected');
        });
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            sendMessageToClients(msg,socket)
          });
});

function sendMessageToClients(mes,socket){
     socket.broadcast.emit('message', mes)
    //io.emit('message',mes)
}
        

http.listen(port, () => {
        });