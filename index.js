//import express from 'express' //ES6 Modules

console.log("It's alive");

const express = require('express'); // CommonJS Modules equivalent to above

//hubs model with be an object that returns an promise
const hubsModel = require('./data/hubs-model.js');

const server = express();

//middleware, this teaches express how to read JSON from the request body, using JSON the quotes matter " " needed
server.use(express.json());

server.get('/', (req, res) => {
	//order matters, the first argument is 
	res.send('hello node 22');
});
//add a hub
server.get('/hubs', (req, res) => {
	//get a list of hubs from the database 
	hubsModel
		.find()
		.then(hubs => {
			//send the list of hubs back to the client
			res.send(hubs);
		}).catch(error => {
			res.send(error);
		});
});
//add a hub
server.post('/hubs', (req, res) => {
	//axios.post(url, data);
	//get the hub data from the request
	//how to read data from the body of the request?
	const hubData = req.body;
	//validate the data sent by the client
	//NEVER TRUST THE CLIENT!!!! that the client is checking
	//a function that validates data
	if (!hubData.name) {
		res.status(400).json({ message: 'give me a name' })
	} else {
		hubsModel
	}

	console.log('hub Data', hubData);
	//add the hub to the database
	hubsModel
		.add(hubData)
		.then(hub => {
			//send the list of hubs back to the client
			res.json(hub); //.json() take javascript object and will set the right headers and convert to JSON the stuff I'm sending is json, xml, html
			//setting header
		})
		.catch(error => {
			res.json({ message: 'error saving the hub' });
		});
});
//dynamic HTML axios.delete will pass URL with concantenated ID like axios.delete('/hubs/2'), dynamic id syntax is :id, id is grabbed out of params object
server.delete('/hubs/:id', (req, res) => {
	//params is an object with all the url parameters
	const id = req.params.id;

	hubsModel.remove(id)
		.then(hub => {
			//send the list of hubs back to the client
			res.json(hub); //.json() take javascript object and will set the right headers and convert to JSON the stuff I'm sending is json, xml, html
			//setting header
		})
		.catch(error => {
			res.json({ message: 'error saving the hub' });
		});
});

server.put('/hubs/:id', (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	hubsModel.update(id, changes)
		.then(hub => {
			//send the hub back to the client
			res.json(hub); //json() will set the correct headers and convert to JSON
		})
		.catch(error => {
			res.json({ message: 'Error during updating the hub' });
		})
})

const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));