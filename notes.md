#notes

applications over http

client ==HTTP==[api]

HTTP- http methods GET POST PUT DELETE

http message - request, response
 - message is a javascript object with two parts the first part is the -header and the other is the -body

[client] makes a request to the [server]

[server] sends a response to the [client]

from react you make a request using axios

server/api sends a response to the client

every request handler gets access to two objects
//order matters the first argument is the request and the second is the response
think of the homies req and rest.

our job is to send a response to the client