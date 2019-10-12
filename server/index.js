const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {resolve} = require("path")

const Discogs = require('disconnect').Client;

io.on('connection', function(socket){
  socket.on('load', function(msg){
    console.log('load', msg)
    io.emit('load', msg);
  });
  socket.on('unload', function(msg){
    io.emit('unload', msg);
  });
});

app.use(bodyParser.json())

require('dotenv').config()

const dis = new Discogs({userToken: process.env.DISCOGS_USER_TOKEN});
const db = dis.database()

app.post("/api/search", async (req, res) => {
  console.log(req.body)
  const release = await db.getRelease(req.body.q)
  res.json(release)
})

app.use(express.static('dist'))

app.get("*", (req, res) => res.sendFile(resolve('dist/index.html')))

http.listen(3000)
