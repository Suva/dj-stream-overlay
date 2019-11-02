const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {resolve} = require("path")

const Discogs = require('disconnect').Client;
const axios = require('axios')

io.on('connection', function(socket){
  socket.on('load', async function(msg){
    console.log("load")
    if(msg.record.thumb) {
      const image = await axios.get(msg.record.thumb, {responseType: 'arraybuffer'})
      msg.record.thumbnail = 'data:image/jpeg;base64,' + image.data.toString('base64')
    }

    io.emit('load', msg);
  });
  socket.on('unload', function(msg){
    console.log('unload', msg)
    io.emit('unload', msg);
  });
  socket.on('title', function(msg){
    io.emit('title', msg);
  });
});

app.use(bodyParser.json())

require('dotenv').config()

const dis = new Discogs({userToken: process.env.DISCOGS_USER_TOKEN});
const db = dis.database()

app.post("/api/search", async (req, res) => {
  const release = await db.getRelease(req.body.q)
  res.json(release)
})

app.post("/api/new-track", async (req, res) => {
  io.emit('rekordbox-load', req.body);
  res.json({ status: "OK" })
})

app.post("/api/add-image", async (req, res) => {
  io.emit('rekordbox-image', req.body);
  res.json({ status: "OK" })
})

app.use(express.static('dist'))

app.get("*", (req, res) => res.sendFile(resolve('dist/index.html')))

http.listen(3000)
