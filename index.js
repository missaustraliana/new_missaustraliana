const io = require('socket.io-client');
const byteSize = require('byte-size');
const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
app.use(express.static("public"));
const serverUrl = 'https://tracker.archiveteam.org:8081/urls-log';
process.stdout.write('START\r');
const socket = io.connect(serverUrl, {
  'force new connection': true,
  'reconnect': true,
  'reconnection delay': 2000,
  'max reconnection attempts': 10,
  'secure': true,
  'connect timeout': 5000
});

const PORT = process.env.PORT || 3131;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

socket.on('connect', function() {
  process.stdout.write('CONNECTED\r\n');
  itm_count = 0
  dl_size = 0
  
});

socket.on('connecting', function() {
  process.stdout.write('REQUEST\r');
});

socket.on('connect_failed', function() {
  console.error('Connection failed');
});

socket.on('error', function(err) {
  console.error('Socket error:', err);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// Example: Receive message from server
socket.on('log_message', function(data) {
  const json = JSON.parse(data);
   if (json.downloader == 'fullpwnmedia') {
   itm_count = itm_count + json.items.length
   dl_size = dl_size + json.domain_bytes.data
    console.log(itm_count + ' items, ' + byteSize(dl_size) + ' downloaded');
 }
//    console.log(data);
});

// Handle process termination
process.on('SIGINT', function() {
  console.log('Shutting down...');
  socket.disconnect();
  process.exit(0);
});