const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	},
})
const cors = require('cors')
app.use(cors())

// server static files
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
	console.log('A user connected')
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected')
	})
	socket.on('sendImage', (res) => {
		socket.emit('receiveImage', res)
	})
})
http.listen(3000, function () {
	console.log('listening on *:3000')
})
