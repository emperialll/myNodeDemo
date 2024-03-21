const debug = require('debug')('app:startup');
const Joi = require('joi');
const logger = require('./logger');
const authenticator = require('./auth');
const express = require('express');
const log = require('./logger');
const app = express();

app.use(express.json());

app.use(logger);
app.use(authenticator);


const roadmaps = [
    { id: 1, name: "Roadmap 1" },
    { id: 2, name: "Roadmap 2" },
    { id: 3, name: "Roadmap 3" }
]

app.get('/', (req, res) => {
    res.send("Hellp World!!!");
})

app.get('/api/roadmaps', (req, res) => {
    res.send(roadmaps);
})

app.post('/api/roadmaps', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const newRoadmap = {
        id: roadmaps.length + 1,
        name: req.body.name
    }
    roadmaps.push(newRoadmap)
    res.send(newRoadmap)
})

app.get('/api/roadmaps/:id', (req, res) => {
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")
    res.send(roadmap);
})

app.put('/api/roadmaps/:id', (req, res) => {

    // Check to see if the roadmap exists
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")

    // Validate the request body
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Update the Roadmap
    roadmap.name = req.body.name;
    res.send(roadmap);
})

app.delete('/api/roadmaps/:id', (req, res) => {

    // Check to see if the roadmap exists
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")

    // Validate the request body
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Delete the Roadmap
    const index = roadmaps.indexOf(roadmap);
    roadmaps.splice(index, 1);
    res.send(roadmap);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
